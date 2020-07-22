import React, { useState, useEffect , useContext } from "react";
import Form from "../../components/posts/PostForm";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { UserState } from "../../App";
// 라우트로 설정한 컴포넌트는, 3가지의 props 를 전달받게 됩니다:여기서는 Home,과 About
// history 이 객체를 통해 push, replace 를 통해 다른 경로로 이동하거나 앞 뒤 페이지로 전환 할 수 있습니다.
// location 이 객체는 현재 경로에 대한 정보를 지니고 있고 URL 쿼리 (/about?foo=bar 형식) 정보도 가지고있습니다.
// match 이 객체에는 어떤 라우트에 매칭이 되었는지에 대한 정보가 있고 params (/about/:name 형식) 정보를 가지고있습니다.

// 중첩 라우팅을 구현에는 이 중에서도 특히 매칭 정보를 담고 있는 match prop이 사용되는데,
//  match.url은 <Link> 컴포넌트를 위해 사용되고 match.path는 <Route> 컴포넌트를 위해 사용됩니다.
// match.url과 match.path의 차이는 match.url는 실제로 매칭된 URL 문자열(ex. /articles/1)을 담고 있는 반면에,
//  match.path은 매칭에 사용된 경로의 패턴(ex. /articles/:id)을 담고 있습니다.
const PostsUpdate = ({ history, location, match }) => {
  const user = useContext(UserState);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const { title, content } = form;
  // const [author, setAuthor] = useState('');
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const splitedUrl = match.url.split("/");
  const updateKey = splitedUrl[splitedUrl.length - 1];

  useEffect(() => {
    let isData = false;
    console.log("렌더링 완료.");
    console.log(`match.path:${match.path}`); // /posts/update/:id
    console.log(`match.url: ${match.url}`); // /posts/update/1
    console.log(`updateKey: ${updateKey}`);
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/posts/" + updateKey,
        );
        const data = res.data;
        // const author = data.author;
        const title = data.title;
        const content = data.content;
        console.log(title);
        console.log(content);
        console.log(`서버응답: ${JSON.stringify(res)}`);
        if (!isData) {
          console.log(isData);
          console.log(`author: ${res.data.author}`);
          console.log(`title: ${res.data.title}`);
          console.log(`content: ${res.data.content}`);

          setForm({
            // author: res.data.author,
            title: res.data.title,
            content: res.data.content,
          });
        }
      } catch (e) {
        if (e.message === "Network Error") alert("서버통신에러!!");
        console.log(`에러: ${e}`);
      }
    }
    fetchData();
    return () => {
      isData = true;
    }; //useEffect 함수의 return값이 있는 경우 hook의 cleanup함수로 인식하고 다음 effect가 실행되기전에 실행함.
  }, []); //useEffect 두번째인자로 빈배열을 주면 컴포넌트가 화면에 가장 처음 렌더링 될때만 useEffect가 실행되고 업데이트할때는 안됨.
  //두번째 파라미타로 배열안에 검사하고 싶은것만 넣으면 특정값이 업데이트 될때만 실행됨. ex) [name, id]

  const handleDelete = async () => {
    console.log(`## 삭제버튼 누름 ##`);
    try {
      const serverRes = await axios.delete(
        "http://localhost:8080/api/v1/posts/" + updateKey,
      );
      console.log(`게시글삭제 서버응답: ${JSON.stringify(serverRes)}`);
      console.log(`serverRes.status:${serverRes.status}`);
      if (serverRes) {
        alert("삭제되었습니다.");
        
        history.push("/posts"); //해당 url로 리다이렉트.
      }
    } catch (e) {
      if (e.message === "Network Error") {
        alert("서버통신에러!!");
      } else {
        alert("서버에러!");
      }
      console.log(`에러: ${e}`);
    }
  };

  const handleSubmit = async () => {
    console.log(`### 글수정 버튼 누름 ###`);
    // console.log(`작성자: ${author}`);
    console.log(`제목: ${title}`);
    console.log(`내용: ${content}`);

    const updateParam = {
      author: user.name,
      title: title,
      content: content,
    };

    if(title.trim().length === 0) {
      alert("제목은 필수 입력사항 입니다.");
      return;
    }
    
    console.log(`updateParam : ${JSON.stringify(updateParam)}`);
    try {
      const result = await axios.put(
        "http://localhost:8080/api/v1/posts/" + updateKey,
        updateParam,
      );
      console.log(`글수정 서버응답:${result}`);
      if (result) {
        alert("수정되었습니다.");
        history.push("/posts"); //해당 url로 리다이렉트.
      }
    } catch (e) {
      if (e.message === "Network Error") {
        alert("서버통신에러!!");
      } else {
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
    console.log(`핸들체인지 시작 >> name: ${name}, value:${value}`);
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
        수정
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleDelete}>
        삭제
      </Button>
      <Button variant="outlined" color="secondary" onClick={goBack}>
        취소
      </Button>
      </div>
    </>
  );
};

export default PostsUpdate;
