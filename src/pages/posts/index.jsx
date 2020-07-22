import React, {useContext} from "react";
import { UserState } from "../../App";

import { Route } from "react-router-dom";
import PostTablePage from "./PostTablePage";
import PostsInsertPage from "./PostsInsertPage";
import PostsUpdatePage from "./PostsUpdatePage";

// 라우트로 설정한 컴포넌트는, 3가지의 props 를 전달받게 됩니다:여기서는 Home,과 About
// history 이 객체를 통해 push, replace 를 통해 다른 경로로 이동하거나 앞 뒤 페이지로 전환 할 수 있습니다.
// location 이 객체는 현재 경로에 대한 정보를 지니고 있고 URL 쿼리 (/about?foo=bar 형식) 정보도 가지고있습니다.
// match 이 객체에는 어떤 라우트에 매칭이 되었는지에 대한 정보가 있고 params (/about/:name 형식) 정보를 가지고있습니다.

// 중첩 라우팅을 구현에는 이 중에서도 특히 매칭 정보를 담고 있는 match prop이 사용되는데,
//  match.url은 <Link> 컴포넌트를 위해 사용되고 match.path는 <Route> 컴포넌트를 위해 사용됩니다.
// match.url과 match.path의 차이는 match.url는 실제로 매칭된 URL 문자열(ex. /articles/1)을 담고 있는 반면에,
//  match.path은 매칭에 사용된 경로의 패턴(ex. /articles/:id)을 담고 있습니다.
const Posts = ({ history, location, match , currentUser}) => {
  // const query = queryString.parse(location.search);
  // console.log(query);
  const user = useContext(UserState); 
  console.log(user.name)
  console.log(user.email)
  return (
    <>
      {console.log(`match.path:${match.path}`)}
      {console.log(`${match.path}/insert`)}
      <Route exact path={match.path} component={PostTablePage} />
      <Route exact path={`${match.path}/insert`} component={PostsInsertPage} />
      <Route
        exact
        path={`${match.path}/update/:id`}
        component={PostsUpdatePage}
      /> 
    </>
  );
};

export default Posts;
