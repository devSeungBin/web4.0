import "./App.scss";
import React, { useState } from "react";
import NavLayout from "./Layouts/NavLayouts/NavLayout";
import NavThemeLayout from "./Layouts/NavLayouts/NavThemeLayout";
import MainPage from "./Pages/MainPages/MainPage";
import MainLoginBox from "./Pages/LoginPages/MainLoginBox";
import MainSignUpBox from "./Pages/SignUpPages/MainSignUpBox";
import MapTheme from "./Pages/ThemePages/MapTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Cookies } from 'react-cookie';

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./modules/loginState";

const AUTH_URL = "http://localhost:5000/users/auth";
const REFREESH_URL = "http://localhost:5000/users/refresh";

function App() {
  // 로그인 박스 활성화/비활성화를 위한 useState -> 로고 클릭시 로그인 화면 on/off
  const [logo, setLogo] = useState(true);
  // 로고 클릭시 ture <-> false
  const handleLogoBox = () => {
    setLogo(!logo);
  };

  // 로그인 세션 여부 확인
  const isLogin = useSelector((state) => state.loginState.isLogin);
  const dispatch = useDispatch();
  const handleIsLogin = () => {
    if (!isLogin) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }

  // 로그인 시 토큰 발급 함수, 토큰 만료 시 재발급 함수 정의
  const cookies = new Cookies();
  const handleRefresh = async (callback) => {
    await axios.get(REFREESH_URL, {withCredentials: true})
      .then((res) => {
        const data = res.data;
        cookies.set('accessToken', data.accessToken);
        handleAuth(callback);
      })
      .catch((err) => {
        const data = err.response.data;
        alert('자동 로그아웃되었습니다. 다시 로그인해 주십시오.');
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
        if (isLogin) {
          handleIsLogin();
        }
        callback(true, data.redirectURI);
      });
  };

  const handleAuth = async (callback) => {
    await axios.get(AUTH_URL, {withCredentials: true})
      .then((res) => {
        callback(false, null);
      })
      .catch(async (err) => {
        const data = err.response.data;
        if (data.redirectURI === "/users/refresh") {
          handleRefresh(callback);
        } else if (data.redirectURI === "/users/login") {
          callback(true, data.redirectURI);
        }
      });
  };


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* NavBar가 있는 페이지 */}
          <Route element={<NavLayout isLogin={isLogin} handleIsLogin={handleIsLogin} />}>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route element={<NavThemeLayout />}>
            {/* 테마 페이지 - 지도 */}
            <Route path="/map" element={<MapTheme />} />
          </Route>
          {/* NavBar가 없는 페이지 */}
          {/* 로그인 */}
          <Route path="users">
            <Route
              path="login"
              element={
                <MainLoginBox
                  logo={logo}
                  setLogo={setLogo}
                  isLogin={isLogin}
                  handleIsLogin={handleIsLogin}
                  handleLogoBox={handleLogoBox}
                  handleAuth={handleAuth}
                />
              }
            />
          </Route>
          {/* 회원가입 */}
          <Route path="users">
            <Route path="registrations" element={<MainSignUpBox setLogo={setLogo} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;