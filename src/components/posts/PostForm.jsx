import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

// value: 인풋의 내용
// onCreate: 버튼이 클릭 될 때 실행 될 함수
// onChange: 인풋 내용이 변경 될 때 실행되는 함수
// onKeyPress: 인풋에서 키를 입력 할 때 실행되는 함수. 이 함수는 나중에 Enter 가 눌렸을 때 onCreate 를 한 것과 동일한 작업을 하기 위해서 사용합니다.
//제목... 작성자... 내용 3개 받음. 이벤트랑.

const Form = ({
  handleChange,
  author,
  title,
  content,
}) => {
  const classes = useStyles();

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          {/* <div>작성자</div>
          <TextField
            required
            id="standard-required"
            label="Required"
            //  defaultValue=""
            value={author}
            placeholder="작성자"
            name="author"
            disabled
          /> */}
          <div>제목</div>
          <TextField
            required
            id="standard-required"
            label="Required"
            //  defaultValue=""
            value={title}
            placeholder="제목"
            name="title"
            onChange={handleChange}
          />
          <div>내용</div>
          <TextField
            id="outlined-multiline-static"
            label="내용"
            multiline
            rows={25}
            value={content}
            variant="outlined"
            name="content"
            onChange={handleChange}
          />
        </div>
      </form>

    </>
  );
};

export default Form;
