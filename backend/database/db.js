import mongoose from "mongoose";

const Connection = async (URL) => {
  // const URL = `mongodb+srv://${username}:${password}@blog-app.qswpg.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database Connection Failed", error);
  }
};


export default Connection;
