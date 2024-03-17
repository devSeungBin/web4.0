import React from "react";
import "./App.scss";
import MainBox from "./components/MainBox";
import LogoBox from "./components/LogoBox";
import LoginBox from "./components/LoginBox";

function App() {
  return (
    <div className="App">
      {/* 메인 박스 */}
      <MainBox>
        {/* 로고 박스 */}
        <LogoBox></LogoBox>
        {/* 로그인 박스 */}
        <LoginBox></LoginBox>
      </MainBox>
    </div>
  );
}

export default App;
