import React from "react";
import "./LoginBox.scss";

function LoginBox() {
  return (
    <div className="LoginBox">
      <div className="inner">
        <h1>Pagoth</h1>
        <input
          type="text"
          id="user_id"
          className="userBox"
          placeholder="이메일 주소"
        />
        <input
          type="password"
          id="user_pwd"
          className="userBox"
          placeholder="패스워드"
        />
        <input type="submit" className="login" value="로그인"/>
      </div>
    </div>
  );
}

export default LoginBox;
