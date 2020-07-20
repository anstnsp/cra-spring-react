import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { localLogin } from "../util/APIUtils";
import { Redirect } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  ACCESS_TOKEN,
} from "../constants";

import googleLogo from "../google-logo.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ authenticated, currentUser, location,history , isLogged}) {
  const classes = useStyles();
  console.log(`signin페이지 authenticated값:${authenticated}`);
  console.log(`access_token:${ACCESS_TOKEN}`);
  const alert = useAlert(); 
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = signinForm;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`name:${name}, value: ${value}`);
    setSigninForm({
      ...signinForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localLogin(signinForm)
      .then((response) => {
        console.log(`response:${JSON.stringify(response)}`)
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        alert.success("로그인 되었습니다.", {
          closeCopy : "확인",
          onClose : () => {
            window.location.href="/"
          }
        });
      })
      .catch((error) => {
        if(error.status === 400) {
          alert.error(`이메일을 형식에 맞게 입력해주세요.`, {
            closeCopy: "확인"
          })
        } else if(error.status === 500) {
          alert.error(error.message, {
            closeCopy: "확인"
          })
        }
        alert.error(error.message)
        console.log(`error: ${JSON.stringify(error)}`);
       // alert.error(error.message)
      });
  }; //end handleSubmit

  if (authenticated) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location },
        }}
      />
    );
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            환영합니다!
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              value={password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
            >
              로그인
            </Button>

            <a href={GOOGLE_AUTH_URL}>
              <img src={googleLogo} alt="google" />
              구글 로그인
            </a>
            {/* <a href={KAKAO_AUTH_URL}>
              <img src={kakaoLogo} alt="kakao" />
              카카오 로그인 
            </a> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호를 잊으셨나요?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"회원가입"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}
