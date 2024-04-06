import "./App.scss";
import React, { useState, useEffect } from "react";
import NavLayout from "./Layouts/NavLayout";
import MainPage from "./Pages/MainPages/MainPage";
import MainLoginBox from "./Pages/LoginPages/MainLoginBox";
import MainSignUpBox from "./Pages/SignUpPages/MainSignUpBox";
// import MainMapTheme from "./Pages/MapThemePages/MainMapTheme";
// import MapTheme from "./Pages/MapThemePages/MapTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const SEVER_URL = "http://localhost:4000/api/todo";

function App() {
  // 로그인 박스 활성화/비활성화를 위한 useState -> 로고 클릭시 로그인 화면 on/off
  const [logo, setLogo] = useState(true);
  // 로고 클릭시 ture <-> false
  const handleLogoBox = () => {
    setLogo(!logo);
  };

  // 서버로 데이터 보내기/받기
  const [todoList, setTodoList] = useState(null);
  // 데이터 불러오기
  const fetchData = async () => {
    const response = await axios.get(SEVER_URL);
    setTodoList(response.data);
  };
  // 최초 마운트시
  useEffect(() => {
    fetchData();
  }, []);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email1 = e.target.email1.value;
    const email2 = e.target.email2.value;
    const pwd = e.target.pwd.value;
    await axios.post(SEVER_URL, { name, email1, email2, pwd });
    fetchData();
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
          <Route
            path="/login"
            element={<MainLoginBox logo={logo} handleLogoBox={handleLogoBox} />}
          />
          {/* 회원가입 */}
          <Route
            path="/signUp"
            element={
              <MainSignUpBox
                onSubmitHandler={onSubmitHandler}
                todoList={todoList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
