import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signup } from "../util/APIUtils";
import { useAlert } from "react-alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({location, match, history}) {
  const alert = useAlert(); 
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "" 
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`name:${name}, value: ${value}`);
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupForm)

    signup(signupForm)
    .then((response) => {
      console.log(`response:${response}`);
      alert.success("회원가입이 되었습니다.\n 로그인 해주세요!", {
        closeCopy : "확인",
        onClose: () => history.push("/")
      //  actions: [
      //    {
      //      copy: "확인",
      //      onClick: () => history.push("/")
      //    }
      //  ]
      })
    })
    .catch((error) => {
      console.log(`error:${JSON.stringify(error)}`)
      alert.error(`회원가입에 실패`, {
        closeCopy: "확인"
      })
    })
    

    // localLogin(signinForm)
    //   .then((response) => {
    //     localStorage.setItem(ACCESS_TOKEN, response.accessToken);
    //     alert.success("You're successfully logged in!");
    //     this.props.history.push("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert(
    //       (error && error.message) ||
    //         "Oops! Something went wrong. Please try again!"
    //     );
    //   });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="이메일을 통해 광고 및 프로모션 이벤트를 수신 받으시려면 체크 해주세요."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            회원가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                회원이신가요? 로그인 하러가기
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      
      </Box>
    </Container>
  );
}