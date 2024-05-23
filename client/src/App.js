import "./App.scss";
import { useState } from "react";
import NavThemeLayout from "./Layouts/NavLayouts/NavThemeLayout";
import MainLoginBox from "./Pages/LoginPages/MainLoginBox";
import MainSignUpBox from "./Pages/SignUpPages/MainSignUpBox";
import MapTheme from "./Pages/ThemePages/MapTheme";
import SportsTheme from "./Pages/ThemePages/SportsTheme";
import LocationTheme from "./Pages/ThemePages/LocationTheme";
import AddPhotoPage from "./Pages/AddPhotoPages/AddPhotoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./modules/loginState";

// 메인페이지 import
import Home from "../src/Pages/MainPages/Home";
import Main from "../src/Pages/MainPages/Main";
import MyGall from "../src/Pages/MainPages/MyGall";
import Create from "../src/Pages/MainPages/Create";
import Profile from "../src/Pages/MainPages/Profile";
import Setting from "../src/Pages/MainPages/Setting";

const AUTH_URL = "http://localhost:5000/auth";
const REFREESH_URL = "http://localhost:5000/auth/refresh";

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

  // 나라 위에 preview 박스 표시
  const mokData = [
    { id: 0, month: "March", year: 2001 },
    { id: 1, month: "May", year: 2007 },
    { id: 2, month: "October", year: 2014 },
    { id: 3, month: "December", year: 2020 },
  ];
  const [data, setData] = useState(mokData);
  // 스와이퍼에 표시할 이미지 mokData
  const imgMokdata = [
    {
      id: 0,
      img_path: "/img/Grand Canyon.jpg",
      // img_tag: "Grand Canyon",
      img_tag: "Grand Canyon^&*hello^&*Code^&*Sleep",
      img_date: "2001-03-29",
      img_description:
        "국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
    },
    {
      id: 1,
      img_path: "/img/Machu Picchu.jpg",
      img_tag: "Machu Picchu",
      img_date: "2012-05-22",
      img_description:
        "타인의 범죄행위로 인하여 생명·신체에 대한 피해를 받은 국민은 법률이 정하는 바에 의하여 국가로부터 구조를 받을 수 있다.",
    },
    {
      id: 2,
      img_path: "/img/Maldives.jpg",
      img_tag: "Maldives",
      img_date: "2015-06-24",
      img_description:
        "탄핵결정은 공직으로부터 파면함에 그친다. 그러나, 이에 의하여 민사상이나 형사상의 책임이 면제되지는 아니한다.",
    },
    {
      id: 3,
      img_path: "/img/Srilanka.jpg",
      img_tag: "Srilanka",
      img_date: "2018-11-03",
      img_description:
        "계엄을 선포한 때에는 대통령은 지체없이 국회에 통고하여야 한다.",
    },
    {
      id: 4,
      img_path: "/img/Bali.jpg",
      img_tag: "Bali",
      img_date: "2023-04-26",
      img_description:
        "국회는 법률에 저촉되지 아니하는 범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다.",
    },
    {
      id: 5,
      img_path: "/img/Cat.jpg",
      img_tag: "Cat",
      img_date: "2021-07-26",
      img_description:
        "법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다.",
    },
    {
      id: 6,
      img_path: "/img/Library.jpg",
      img_tag: "Library",
      img_date: "2019-02-12",
      img_description:
        "대한민국은 통일을 지향하며, 자유민주적 기본질서에 입각한 평화적 통일 정책을 수립하고 이를 추진한다.",
    },
    {
      id: 7,
      img_path: "/img/London.jpg",
      img_tag: "London",
      img_date: "2017-01-17",
      img_description:
        "모든 국민은 보건에 관하여 국가의 보호를 받는다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.",
    },
    {
      id: 8,
      img_path: "/img/Elk.jpg",
      img_tag: "Elk",
      img_date: "2015-10-30",
      img_description:
        "군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다.",
    },
    {
      id: 9,
      img_path: "/img/Earth.jpg",
      img_tag: "Earth",
      img_date: "2022-12-25",
      img_description:
        "헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며, 재판관은 대통령이 임명한다.",
    },
  ];

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
          <Route element={<NavThemeLayout />}>
            <Route path="users">
              {/* 테마 페이지 - 여행 */}
              <Route
                path="map"
                element={<MapTheme data={data} imgMokData={imgMokdata} />}
              />
              {/* 테마 페이지 - 운동 */}
              <Route
                path="sports"
                element={<SportsTheme data={data} imgMokData={imgMokdata} />}
              />
              {/* 테마 페이지 - 장소 */}
              <Route
                path="location"
                element={<LocationTheme data={data} imgMokData={imgMokdata} />}
              />
              <Route path="addPhoto" element={<AddPhotoPage />}></Route>
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
