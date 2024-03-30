import React from "react";
import "./LoginBox.scss";

function LoginBox({ logo, handleLoginBox }) {
  // className - LoginBox
  const loginClass = `LoginBox ${logo ? "off" : "on"}`;
  // className - innerBox
  const innerClass = `inner ${logo ? "off" : "on"}`;
  return (
    <div className={loginClass}>
      <div className={innerClass}>
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
        <input type="submit" className="login" value="로그인" />
        <span onClick={handleLoginBox}>회원가입</span>
      </div>
    </div>
  );
}

export default LoginBox;
