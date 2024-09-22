import grid from "gridfs-stream";
import mongoose from "mongoose";
// hello
const url = "https://blogappnewbackend.onrender.com";

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadImage = (request, response) => {
  // Ensure that GridFS is initialized
  if (!gfs || !gridfsBucket) {
    console.log(
      "Database connection is not established==>",
      "Database connection is not established"
    );
    return response
      .status(500)
      .json({ msg: "Database connection is not established" });
  }

  if (!request.file) {
        console.log("File not found====>", "File not found");

    return response.status(404).json({ msg: "File not found" });
  }

  const imageUrl = `${url}/file/${request.file.filename}`;
  return response.status(200).json(imageUrl);
};

export const getImage = async (request, response) => {
  try {
    // Ensure that GridFS is initialized
    if (!gfs || !gridfsBucket) {
      return response
        .status(500)
        .json({ msg: "Database connection is not established" });
    }
    const file = await gfs.files.findOne({ filename: request.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

