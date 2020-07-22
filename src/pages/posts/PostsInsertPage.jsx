import React, { useState, useContext } from "react";
import Form from "../../components/posts/PostForm";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { UserState } from "../../App";

// 라우트로 설정한 컴포넌트는, 3가지의 props 를 전달받게 됩니다:여기서는 Home,과 About
// history 이 객체를 통해 push, replace 를 통해 다른 경로로 이동하거나 앞 뒤 페이지로 전환 할 수 있습니다.
// location 이 객체는 현재 경로에 대한 정보를 지니고 있고 URL 쿼리 (/about?foo=bar 형식) 정보도 가지고있습니다.
// match 이 객체에는 어떤 라우트에 매칭이 되었는지에 대한 정보가 있고 params (/about/:name 형식) 정보를 가지고있습니다.

// 중첩 라우팅을 구현에는 이 중에서도 특히 매칭 정보를 담고 있는 match prop이 사용되는데,
//  match.url은 <Link> 컴포넌트를 위해 사용되고 match.path는 <Route> 컴포넌트를 위해 사용됩니다.
// match.url과 match.path의 차이는 match.url는 실제로 매칭된 URL 문자열(ex. /articles/1)을 담고 있는 반면에,
//  match.path은 매칭에 사용된 경로의 패턴(ex. /articles/:id)을 담고 있습니다.
const PostsInsert = ({ history, location, match }) => {
  const user = useContext(UserState);

  // const query = queryString.parse(location.search);
  // console.log(query);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const { title, content } = form;
  // const [author, setAuthor] = useState('');
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const { title, content } = form;
    console.log(`### 글등록 버튼 누름 ###`);
    console.log(`제목: ${title}`);
    console.log(`내용: ${content}`);
    console.log(title.trim().length); 
    if(title.trim().length === 0) {
      alert("제목은 필수 입력사항 입니다.");
      return;
    }
    const insertParam = {
      author: user.name,
      title: title,
      content: content,
    };

    console.log(`insertParam : ${JSON.stringify(insertParam)}`);
    try {
      const result = await axios.post(
        "http://localhost:8080/api/v1/posts",
        insertParam,
      );
      console.log(`글등록 서버응답:${result}`);
      if (result) {
        alert("저장되었습니다.");
        history.push("/posts"); //해당 url로 리다이렉트.
      }
    } catch (e) {
      if (e.message === "Network Error") {
        alert("서버통신에러!!");
      } else {
        console.log(e.message)
        alert("서버에러!");
      }
      console.log(`에러: ${e}`);
    }
  };

  const goBack = () => {
    console.log("이전페이지로 이동");
    history.goBack(); //전페이지로 뒤로 가기
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <Form
        handleChange={handleChange}
        title={title}
        content={content}
      />
      <div>
      <Button
        variant="outlined"
        color="primary"
        align="right"
        onClick={handleSubmit}
      >
        등록
      </Button>
      <Button variant="outlined" color="secondary" onClick={goBack}>
        취소
      </Button>
      </div>
    </>
  );
};
export default PostsInsert;
