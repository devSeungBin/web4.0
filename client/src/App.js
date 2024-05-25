import "./App.scss";
import { useState } from "react";
import NavThemeLayout from "./Layouts/NavLayouts/NavThemeLayout";
import MainLoginBox from "./Pages/LoginPages/MainLoginBox";
import MainSignUpBox from "./Pages/SignUpPages/MainSignUpBox";
import MapTheme from "./Pages/ThemePages/MapTheme";
import SportsTheme from "./Pages/ThemePages/SportsTheme";
import FoodTheme from "./Pages/ThemePages/FoodTheme";
import AnimalTheme from "./Pages/ThemePages/AnimalTheme";
import AddPhotoPage from "./Pages/AddPhotoPages/AddPhotoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./modules/loginState";
import { galleryIn, galleryOut } from "./modules/galleryState";

// 메인페이지 import
import Home from "../src/Pages/MainPages/Home";
import Main from "../src/Pages/MainPages/Main";
import MyGall from "../src/Pages/MainPages/MyGall";
import Create from "../src/Pages/MainPages/Create";
import Profile from "../src/Pages/MainPages/Profile";
import Setting from "../src/Pages/MainPages/Setting";

const AUTH_URL = "http://43.203.241.227:5000/auth";
const REFREESH_URL = "http://43.203.241.227:5000/auth/refresh";

function App() {
  // 로그인 박스 활성화/비활성화를 위한 useState -> 로고 클릭시 로그인 화면 on/off
  const [logo, setLogo] = useState(true);
  // 로고 클릭시 ture <-> false
  const handleLogoBox = () => {
    setLogo(!logo);
  };

  
  // 로그인 세션 여부 확인
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.loginState.isLogin);
  const handleIsLogin = () => {
    if (!isLogin) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  };

  // 접속한 갤러리 id 확인
  const gallery_id = useSelector((state) => state.galleryState.gallery_id);
  const handleGalleryId = (id) => {
    if (id) {
      dispatch(galleryIn(id));
    } else {
      dispatch(galleryOut());
    }
  };

  // 로그인 시 토큰 발급 함수, 토큰 만료 시 재발급 함수 정의
  const cookies = new Cookies();
  const handleRefresh = async (callback) => {
    await axios
      .get(REFREESH_URL, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        cookies.set("accessToken", data.accessToken, { path: "/" });

        callback(true, null);
      })
      .catch((err) => {
        const data = err.response.data;
        console.log(data.msg, data.errorCode);

        callback(false, data.errorCode);
      });
  };

  const handleAuth = async (callback) => {
    await axios
      .get(AUTH_URL, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        console.log(data.msg);

        callback(true, null);
      })
      .catch(async (err) => {
        const data = err.response.data;
        console.log(data.msg, data.errorCode);

        callback(false, data.errorCode);
      });
  };

  // 스와이퍼에 표시할 이미지 mokData
  const [themeTag1, setThemeTag1] = useState([]);
  const addThemeTag1 = (newImage) => {
    setThemeTag1((preImages)=> ([
      ...preImages,
      newImage
    ]));
  };
  const resetThemeTag1 = () => {
    setThemeTag1([]);
  };

  const [themeTag2, setThemeTag2] = useState([]);
  const addThemeTag2 = (newImage) => {
    setThemeTag2((preImages)=> ([
      ...preImages,
      newImage
    ]));
  };
  const resetThemeTag2 = () => {
    setThemeTag2([]);
  };

  const [themeTag3, setThemeTag3] = useState([]);
  const addThemeTag3 = (newImage) => {
    setThemeTag3((preImages)=> ([
      ...preImages,
      newImage
    ]));
  };
  const resetThemeTag3 = () => {
    setThemeTag3([]);
  };

  const [themeTag4, setThemeTag4] = useState([]);
  const addThemeTag4 = (newImage) => {
    setThemeTag4((preImages)=> ([
      ...preImages,
      newImage
    ]));
  };
  const resetThemeTag4 = () => {
    setThemeTag4([]);
  };

  const [themeTag5, setThemeTag5] = useState([]);
  const addThemeTag5 = (newImage) => {
    setThemeTag5((preImages)=> ([
      ...preImages,
      newImage
    ]));
  };
  const resetThemeTag5 = () => {
    setThemeTag5([]);
  };

  const [themeTag6, setThemeTag6] = useState([]);
  const addThemeTag6 = (newImage) => {
    setThemeTag6((preImages)=> ([
      ...preImages,
      newImage
    ]));
  };
  const resetThemeTag6 = () => {
    setThemeTag6([]);
  };


  // 갤러리 관련 함수
  const [galleryItems, setGalleryItems] = useState([]);

  const addGalleryItem = (item) => {
    setGalleryItems((preGalleryItems)=> ([
      ...preGalleryItems,
      item
    ]));
  };

  const resetGalleryItem = () => {
    setGalleryItems([]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route
            element={
              <NavLayout isLogin={isLogin} handleIsLogin={handleIsLogin} />
            }
          >
            <Route path="/" element={<MainPage />} />
          </Route> */}
          <Route
            exact
            path="/"
            element={
              <Home
                isLogin={isLogin}
                handleIsLogin={handleIsLogin}
                handleAuth={handleAuth}
                handleRefresh={handleRefresh}
              />
            }
          >
            <Route path="/" element={<Main />} />
            <Route
              path="/MyGall"
              element={
                <MyGall
                  galleryItems={galleryItems}
                  addGalleryItem={addGalleryItem}
                  resetGalleryItem={resetGalleryItem}
                  handleGalleryId={handleGalleryId}
                />
              }
            />
            <Route
              path="/Create"
              element={<Create addGalleryItem={addGalleryItem} />}
            />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Setting" element={<Setting />} />
          </Route>
          {/* 테마 페이지 */}
          <Route element={<NavThemeLayout isLogin={isLogin} handleIsLogin={handleIsLogin} handleAuth={handleAuth} handleRefresh={handleRefresh} />}>
            <Route path="users">
              {/* 테마 페이지 - 여행 */}
              <Route
                path="travel"
                element={<MapTheme 
                  themeTag1={themeTag1} addThemeTag1={addThemeTag1} resetThemeTag1={resetThemeTag1} themeTag2={themeTag2} addThemeTag2={addThemeTag2} resetThemeTag2={resetThemeTag2}
                  themeTag3={themeTag3} addThemeTag3={addThemeTag3} resetThemeTag3={resetThemeTag3} themeTag4={themeTag4} addThemeTag4={addThemeTag4} resetThemeTag4={resetThemeTag4}
                  themeTag5={themeTag5} addThemeTag5={addThemeTag5} resetThemeTag5={resetThemeTag5} themeTag6={themeTag6} addThemeTag6={addThemeTag6} resetThemeTag6={resetThemeTag6}
                  gallery_id={gallery_id}
                   />}
              />
              {/* 테마 페이지 - 운동 */}
              <Route
                path="sports"
                element={<SportsTheme 
                  themeTag1={themeTag1} addThemeTag1={addThemeTag1} resetThemeTag1={resetThemeTag1} themeTag2={themeTag2} addThemeTag2={addThemeTag2} resetThemeTag2={resetThemeTag2}
                  themeTag3={themeTag3} addThemeTag3={addThemeTag3} resetThemeTag3={resetThemeTag3} themeTag4={themeTag4} addThemeTag4={addThemeTag4} resetThemeTag4={resetThemeTag4}
                  themeTag5={themeTag5} addThemeTag5={addThemeTag5} resetThemeTag5={resetThemeTag5}
                  gallery_id={gallery_id}
                   />}
              />
              {/* 테마 페이지 - 음식 */}
              <Route
                path="food"
                element={<FoodTheme 
                  themeTag1={themeTag1} addThemeTag1={addThemeTag1} resetThemeTag1={resetThemeTag1} themeTag2={themeTag2} addThemeTag2={addThemeTag2} resetThemeTag2={resetThemeTag2}
                  themeTag3={themeTag3} addThemeTag3={addThemeTag3} resetThemeTag3={resetThemeTag3} themeTag4={themeTag4} addThemeTag4={addThemeTag4} resetThemeTag4={resetThemeTag4}
                  themeTag5={themeTag5} addThemeTag5={addThemeTag5} resetThemeTag5={resetThemeTag5}
                  gallery_id={gallery_id}
                  />}
              />
              {/* 테마 페이지 - 동물 */}
              <Route
                path="animal"
                element={<AnimalTheme 
                  themeTag1={themeTag1} addThemeTag1={addThemeTag1} resetThemeTag1={resetThemeTag1} themeTag2={themeTag2} addThemeTag2={addThemeTag2} resetThemeTag2={resetThemeTag2}
                  themeTag3={themeTag3} addThemeTag3={addThemeTag3} resetThemeTag3={resetThemeTag3} themeTag4={themeTag4} addThemeTag4={addThemeTag4} resetThemeTag4={resetThemeTag4}
                  themeTag5={themeTag5} addThemeTag5={addThemeTag5} resetThemeTag5={resetThemeTag5} themeTag6={themeTag6} addThemeTag6={addThemeTag6} resetThemeTag6={resetThemeTag6}
                  gallery_id={gallery_id}
                  />}
              />
              <Route path="addPhoto" element={<AddPhotoPage gallery_id={gallery_id} />}></Route>
            </Route>
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
                  handleLogoBox={handleLogoBox}
                  handleIsLogin={handleIsLogin}
                  handleAuth={handleAuth}
                  handleRefresh={handleRefresh}
                />
              }
            />
          </Route>
          {/* 회원가입 */}
          <Route path="users">
            <Route
              path="registrations"
              element={<MainSignUpBox setLogo={setLogo} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
