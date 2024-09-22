import { useContext } from 'react';
import { Box, styled, Typography } from '@mui/material';
import {Delete} from '@mui/icons-material'
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';


const Component = styled(Box)`
margin-top:30px;
background-color:#f5f5f5;
padding:10px;
`
// hello
const Container = styled(Box)`
display:flex;
margin-bottom:5px;
`
const Name = styled(Typography)`
font-weight:600;
font-size:18px;
margin-right:20px;
`
const StyleDate = styled(Typography)`
color:#878787;
font-size:14px;
`
const DeleteIcon = styled(Delete)`
margin-left:auto;
`



const Comment = ({ comment,setToggle }) => {
    const { accounts } = useContext(DataContext);
    const removeComment = async () => {
        try {
           let response = await API.deleteComment(comment._id);
           if (response.isSucess) {
             setToggle((prev) => !prev);
           } 
        } catch (error) {
            console.log("error in remove comment===>",error)
        }
        
    }
    return (
      <Component>
        <Container>
          <Name>{comment.name}</Name>
          <StyleDate>{new Date(comment.date).toDateString()}</StyleDate>
                {comment.name === accounts.username && <DeleteIcon onClick={ ()=>removeComment()} />}
        </Container>
        <Box>
          <Typography>{comment.comments}</Typography>
        </Box>
      </Component>
    );
};

export default Comment
