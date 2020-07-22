import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary">
        <Link style={style} to="posts/insert">
          글등록
        </Link>
      </Button>
    </div>
  );
}
