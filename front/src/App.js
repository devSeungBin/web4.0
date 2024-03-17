import React from "react";
import "./App.scss";
import MainBox from "./components/MainBox";
import LogoBox from "./components/LogoBox";
import LoginBox from "./components/LoginBox";

function App() {
  return (
    <div className="App">
      <MainBox>
        <LogoBox></LogoBox>
        <LoginBox></LoginBox>
      </MainBox>
    </div>
  );
}

export default App;
