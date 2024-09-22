import { Box, Button, styled, TextareaAutosize } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment";
const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
`;
const initialValues = {
  name: "",
  postId: "",
  comments: "",
  date: new Date(),
};

// hello
const Comments = ({ post }) => {
  const url =
    "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg";
  const [comment, setComment] = useState(initialValues);
  const [comments, setComments] = useState([])
  const [toggle, setToggle]=useState(false)

  const { accounts } = useContext(DataContext);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.getAllComments(post._id);
        if (response.isSucess) {
          setComments(response.data);
        }
      } catch (error) {
        console.log("error get commentts==>", error);
      }
    };
    getData();
  }, [post, toggle]);
  
    const handleChange = (e) => {
    setComment({
      ...comment,
      name:accounts.username,
      postId: post._id,
      comments: e.target.value,
    });
  };
  const AddComment = async (e) => {
    try {
        let response = await API.newComment(comment);
        if (response.isSucess) {
          setComment(initialValues);
        }
        setToggle((prev) => !prev);
    } catch (error) {
      console.log("error in post comment====>", error);
      }
  }
  
  return (
    <Box>
      <Container>
        <Image src={url} alt="dp" />
        <StyledTextArea
          minRows={5}
          placeholder="what's on your mind?"
          value={comment.comments}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="contained"
          style={{ height: 40 }}
          onClick={(e) => AddComment(e)}
        >
          Post
        </Button>
      </Container>
      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => <Comment comment={comment} setToggle={setToggle} />)}
      </Box>
    </Box>
  );
};

export default Comments;
