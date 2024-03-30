import React, { useState } from "react";
import "./App.scss";
import MainBox from "./components/LoginPages/MainBox";
import LogoBox from "./components/LoginPages/LogoBox";
import LoginBox from "./components/LoginPages/LoginBox";
import MainSignUpBox from "./components/SignUpPages/MainSignUpBox";
import SignUpBox from "./components/SignUpPages/SignUpBox";

function App() {
  // 로그인 박스 활성화/비활성화를 위한 useState
  const [logo, setLogo] = useState(true);
  // 회원가입 버튼 클릭 -> 회원가입 페이지 활성화
  const [signUp, setLogin] = useState(false);
  // 로고 클릭시 ture <-> false
  const handleLogoBox = () => {
    setLogo(!logo);
  };
  // 회원가입 클릭시 ture <-> false
  const handleLoginBox = () => {
    setLogin(!signUp);
  };
  return (
    <div className="App">
      {signUp ? (
        <MainSignUpBox>
          <SignUpBox handleLoginBox={handleLoginBox} />
        </MainSignUpBox>
      ) : (
        <MainBox>
          <LogoBox logo={logo} handleLogoBox={handleLogoBox} />
          <LoginBox logo={logo} handleLoginBox={handleLoginBox} />
        </MainBox>
      )}
    </div>
  );
}

export default App;
