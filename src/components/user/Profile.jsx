import React from "react";

const Profile = ({ authenticated, currentUser }) => {
  const { email, name } = currentUser;
  return (
    <>
      <div>프로필</div>

      <div>email: {email}</div>
      <div>name: {name}</div>
    </>
  );
};

export default Profile;
