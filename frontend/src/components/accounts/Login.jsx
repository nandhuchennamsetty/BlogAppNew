import React, { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import ZuaiLogo from "../Images/zuaiLogo.avif";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Wrapper = styled(Box)`
  padding: 0px 35px 35px 25px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
// const MainWrapper = styled(Box)`
//   padding: 0px 35px 35px 25px;
//   display: flex;
//   flex-direction: column;

// `;
// hello
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;

// const HeaderText = styled(Typography)`
//   font-size: 16px;
//   Text-align:center;
//   font-weight:600;
//   color:#623462;
// `;

const ImgLogo = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  marginBottom: 0,
});
const Error = styled(Typography)`
  color: #ff6161;
  font-size: 10px;
  line-height: 0;
  margin-top: 10px;
  font-weight: bold;
`;

const sigupIntial = {
  name: "",
  username: "",
  password: "",
};
const loginInitialValues = {
  username: "",
  password: "",
};

function Login({ isUserAuthenticated }) {
  const [account, setAccount] = useState("login");
  const [signup, setSignup] = useState(sigupIntial);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(loginInitialValues);

  const { setAccounts } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignupBtn = () => {
    account === "signup" ? setAccount("login") : setAccount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  console.log("signup===>", signup);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  // const signupUser = async() => {
  //   let response = await API.userSignup(signup);
  //   console.log("responsedata==>", response);
  //   if (response.isSucess) {
  //     setError("")
  //     setSignup(sigupIntial)
  //     setAccount('login')
  //   } else {
  //     setError("Something went wrong! please try again later")
  //   }
  // }

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      console.log("responsedata==>", response);

      if (response && response.isSucess) {
        // Check if response and isSucess exist
        setError("");
        setSignup(sigupIntial);
        setAccount("login");
      } else {
        setError(
          response?.msg || "Something went wrong! Please try again later"
        );
      }
    } catch (error) {
      console.log("Error in Request:", error);
      setError(
        "Error in Request: " + (error.message || "Please try again later")
      );
    }
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSucess) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccounts({
        username: response.data.username,
        name: response.data.name,
      });
      isUserAuthenticated(true);
      navigate("/");
    } else {
      setError("something went wrong! Please try again later");
    }
  };
  return (
    <Component>
      <Box>
        <ImgLogo src={ZuaiLogo} alt="logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              onChange={(e) => {
                onValueChange(e);
              }}
              label="Enter Username"
              variant="standard"
              name="username"
              value={login.username}
            />
            <TextField
              label="Enter password"
              variant="standard"
              onChange={(e) => {
                onValueChange(e);
              }}
              name="password"
              value={login.password}
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>Or</Text>
            <SignupButton onClick={() => toggleSignupBtn()}>
              Create an Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="standard-basic"
              label="Enter Name"
              name="name"
              variant="standard"
              onChange={(e) => {
                onInputChange(e);
              }}
              value={signup.name}
            />
            <TextField
              id="standard-basic"
              label="Enter Username"
              name="username"
              variant="standard"
              onChange={(e) => {
                onInputChange(e);
              }}
              value={signup.username}
            />
            <TextField
              id="standard-basic"
              label="Enter-password"
              name="password"
              variant="standard"
              onChange={(e) => {
                onInputChange(e);
              }}
              value={signup.password}
            />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>Or</Text>
            <LoginButton variant="contained" onClick={() => toggleSignupBtn()}>
              Already have an Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
}

export default Login;
