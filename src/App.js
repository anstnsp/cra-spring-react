import React, { useState, useEffect } from "react";
import AppTemplate from "./components/common/AppTemplate";
import { Home, NotFound, OAuth2RedirectHandler, Profile } from "./routes";
import { Route, Switch } from "react-router-dom";
import AppBar from "./components/common/Appbar";
import Copyright from "./components/common/Copyright";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/common/PrivateRoute";
import { getCurrentUser } from "./util/APIUtils";
import { ACCESS_TOKEN } from "./constants";
import { useAlert } from "react-alert"
import { Redirect } from "react-router-dom"
// 라우트로 설정한 컴포넌트는, 3가지의 props 를 전달받게 됩니다:여기서는 Home,과 About

// history 이 객체를 통해 push, replace 를 통해 다른 경로로 이동하거나 앞 뒤 페이지로 전환 할 수 있습니다.
// location 이 객체는 현재 경로에 대한 정보를 지니고 있고 URL 쿼리 (/about?foo=bar 형식) 정보도 가지고있습니다.
// match 이 객체에는 어떤 라우트에 매칭이 되었는지에 대한 정보가 있고 params (/about/:name 형식) 정보를 가지고있습니다.

// <Link> => HTML의 <a> 태그와 유사한 기능을 하는 컴포넌트라고 생각하시면 이해가 쉽습니다.
// <a> 태그는 href 속성을 통해 이동할 경로를 지정하는 반면에 <Link> 컴포넌트는 to prop을 통해서 이동할 경로를 지정해줍니다.

/* <Route> 컴포넌트는 현재 주소창의 경로와 매치될 경우 보여줄 컴포넌트를 지정하는데 사용됩니다.
path prop을 통해서 매치시킬 경로를 지정하고 component prop을 통해서 매치되었을 때 보여줄 컴포넌트를 할당합니다. */

/* <Router> 컴포넌트는 위에 나온 <Route>와 <Link> 컴포넌트가 함께 유기적으로 동작하도록 묶어주는데 사용합니다.
다시 말해, <Route>와 <Link> 컴포넌트는 DOM 트리 상에서 항상 <Router>를 공통 상위 컴포넌트로 가져야합니다. */



const App = () => {
  const alert = useAlert(); 

  const [authenticated, setAutenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    createdDate: "",
    modifiedDate: "",
    id: "",
    name: "",
    email: "",
    provider: "",
  });
  const [loading, setLoading] = useState(false);

  const { name, email } = currentUser;
  useEffect(() => {
    console.log(`컴포넌트 마운트됐따.`);
    loadCurrentlyLoggedInUser();
  }, []);
  


  const loadCurrentlyLoggedInUser = () => {
    setLoading(true);
    if(localStorage.getItem(ACCESS_TOKEN) !== null) {
      getCurrentUser()
      .then((response) => {
        console.log(JSON.stringify(response));
        setCurrentUser({
          createdDate: response.createdDate,
          modifiedDate: response.modifiedDate,
          id: response.id,
          name: response.name,
          email: response.email,
          provider: response.provider,
        });
        setAutenticated(true);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(false);
      });
    }

  };

  const haddleLogout = () => {
    console.log(`로그아웃버튼 누름`);
    localStorage.removeItem(ACCESS_TOKEN);
    console.log(`로컬스토리지 토큰값: ${localStorage.getItem(ACCESS_TOKEN)}`);
    setAutenticated(false);
    setCurrentUser({});
    alert.show("로그아웃 되었습니다.", {
      closeCopy : "확인"
    });
  };

  return (
    //header, left, body, right, bottom
      <AppTemplate
        header={
          <AppBar
            authenticated={authenticated}
            currentUser={currentUser}
            haddleLogout={haddleLogout}
          />
        }
        body={
          <Switch>
            <Route exact path="/" component={Home} />
            )} />
            <Route path="/oauth2" component={OAuth2RedirectHandler} />
            <Route
              path="/signin"
              authenticated={authenticated}
              component={SignIn}
            />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute
              path="/profile"
              authenticated={authenticated}
              currentUser={currentUser}
              component={Profile}
            ></PrivateRoute>
            <Route component={NotFound} />
          </Switch>
        }
        bottom={<Copyright />}
      />
  );
};

export default App;
