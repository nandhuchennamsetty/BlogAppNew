import React from 'react'
import { Box, Typography,styled } from "@mui/material"; 

const Image = styled(Box)`
background:url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
width:100%;
height:50vh;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`


const Hedaing = styled(Typography)`
font-size:70px;
color;#ffffff;
line-height:1;
`
const SubHeading = styled(Typography)`
font-size:20px;
background:#ffffff;
padding-left:5px;
padding-right:5px;

`
// hello

const Banner = () => {
  return (
      <Image>
          <Hedaing>BLOG</Hedaing> 
          <SubHeading>React.js Node.js</SubHeading>
    </Image>
  )
}

export default Banner