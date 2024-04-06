import "./App.scss";
import React, { useState } from "react";
import NavLayout from "./Layouts/NavLayout";
import MainPage from "./Pages/MainPages/MainPage";
import MainLoginBox from "./Pages/LoginPages/MainLoginBox";
import MainSignUpBox from "./Pages/SignUpPages/MainSignUpBox";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // 로그인 박스 활성화/비활성화를 위한 useState -> 로고 클릭시 로그인 화면 on/off
  const [logo, setLogo] = useState(true);
  // 로고 클릭시 ture <-> false
  const handleLogoBox = () => {
    setLogo(!logo);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* NavBar가 있는 페이지 */}
          <Route element={<NavLayout />}>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />
          </Route>
          {/* NavBar가 없는 페이지 */}
          {/* 로그인 */}
          <Route path="users">
            <Route
              path="login"
              element={
                <MainLoginBox logo={logo} handleLogoBox={handleLogoBox} />
              }
            />
          </Route>
          {/* 회원가입 */}
          <Route path="users">
            <Route path="registrations" element={<MainSignUpBox />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
