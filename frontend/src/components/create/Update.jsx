import { React, useEffect, useState, useContext } from "react";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)(({ theme }) => ({
  margin: `50px 100px`,
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: row;
`;

const InputTextFlied = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const initalPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const Update = () => {
  const [post, setPost] = useState(initalPost);
  const [file, setFile] = useState(null); // Initialize file as null
  const location = useLocation();
  const navigate = useNavigate();
  const { accounts } = useContext(DataContext);
  const { id } = useParams();
  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const uploadingImage = (e) => {
    console.log("Files====>", e.target.files); // Log files to verify input
    console.log("Files 1st===>", e.target.files[0]); // Log files to verify input

    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  console.log("setvalue====>", file);
  const url = post.picture
    ? post.picture
    : "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg";

  // const getImage = async () => {
  //   if (file) {
  //     try {
  //       const data = new FormData();
  //       data["name"]=file.name ;
  //       data["file"]=file;
  //       console.log("fileData=====>",file)
  //       console.log('data====>',data)
  //       const response = await API.uploadFile(data);
  //       setPost((prevPost) => ({ ...prevPost, picture: response.data }));
  //     } catch (error) {
  //       console.error("Error uploading file:", error);
  //     }
  //   }
  // };
  const getImage = async () => {
    if (file) {
      try {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        // Debugging: Check the contents of the FormData object
        for (let [key, value] of data.entries()) {
          console.log(`${key}: ${value}`);
        }
        console.log("data====>", data);

        const response = await API.uploadFile(data);
        console.log("response==>", response);
        setPost((prevPost) => ({ ...prevPost, picture: response.data }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // hello
  
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSucess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (file) {
      getImage();
    }
    setPost((prevPost) => ({
      ...prevPost,
      categories: location.search?.split("=")[1] || "All",
      username: accounts.username,
    }));
  }, [file]);

  const updateBlogPost = async () => {
    try {
      const response = await API.updatePost(post);
      if (response.isSucess) {
        navigate(`/details/${id}`);
      } else {
        console.log("Error in API response:", response);
      }
    } catch (error) {
      console.log("Error in savePost", error);
    }
  };

  console.log("url====>", post.picture);
  return (
    <Container>
      <Image src={url} alt="banner" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => uploadingImage(e)} // Use the correct function name
        />
        <InputTextFlied
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          name="title"
        />
        <Button variant="contained" onClick={() => updateBlogPost()}>
          Update
        </Button>
      </StyledFormControl>
      <Textarea
        minRows={5}
        placeholder="Tell your story...."
        onChange={handleChange}
        name="description"
        value={post.description}
      />
    </Container>
  );
};

export default Update;
