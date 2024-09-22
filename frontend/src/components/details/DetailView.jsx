import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { useParams ,Link, useNavigate} from "react-router-dom";
import { API } from "../../service/api";
// import { DeleteIcon, EditIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";
const Container = styled(Box)(({ theme }) => ({
   margin: `50px 100px`,
    [theme.breakpoints.down('md')]: {
    margin:0,
 }
}))
// hello
const Image = styled("img")({
  height: "500px",
  maxHeight:"600px",
  width: "100%",
  // height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break-word;
`;

const Edit = styled(EditIcon)`
margin:5px,
  padding:5px,
  border:1px solid #878787,
  border-radius:10px,
`;

const Delete = styled(DeleteIcon)`
margin:5px,
  padding:5px,
  border:1px solid #878787,
  border-radius:10px,
`;

const Author = styled(Box)`
  color: #878787;
  margin: 20px;
  display:flex;
`;

const Description = styled(Typography)`
  word-break: break-word;
  padding:20px;
`;

export const DetailView = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { accounts } = useContext(DataContext);
  const  navigate  = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSucess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  const url = post.picture
    ? post.picture
    : "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg";

  const deleteBlog = async () => {
    try {
      let response = await API.deletePost(post._id);
      if (response.isSucess) {
        navigate("/");
      }
    } catch (error) {
      console.log("error in delete blog==>",error)
    }
    
  }

  return (
    <Container>
      <Image src={url} alt="blog" />
      <Box style={{ float: "right" }}>
        {accounts.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <Edit color="primary" />
            </Link>
            <Delete onClick={()=>deleteBlog()} color="error" />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Typography>
          Author:{" "}
          <Box component="span" style={{ fontWeight: 600 }}>
            {post.username}
          </Box>
        </Typography>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Description>{post.description}</Description>
      <Comments post={post} />
    </Container>
  );
};
