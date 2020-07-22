import React , { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {UserState} from "../../App";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function PostInsertBtn() {
  const classes = useStyles();
  const style = {
    // border: '1px solid black',
    // padding: '8px',
    //margin: '15px',
    //color: "white",
    textDecoration: "none", //<Link>의 밑줄제거
    
  };
  const user = useContext(UserState); 

  const isLogged = () => {
    if(user.name) {
      window.location.href="posts/insert";
      return; 
    } else {
      alert("글등록은 회원만 할 수 있습니다.");
      return;
    }
    
  }
  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={isLogged}>
        {/* <Link style={style} to="posts/insert"> */}
          글등록
        {/* </Link> */}
      </Button>
    </div>
  );
}
