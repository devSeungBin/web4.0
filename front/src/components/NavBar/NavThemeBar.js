import "./NavThemeBar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as SiteLogo } from "../../imgs/SiteMainLogo.svg";
import TopText from "../TopText/TopText";
import SearchBox from "../SerachBox/SearchBox";
// import { useEffect } from "react";

function NavThemeBar() {
  const navigate = useNavigate();
  // ==== 추가 및 변경 부분 START ====
  const { pathname } = useLocation();
  // 이동하는 주소에 따라 다른 값 전달
  const dataClassification = (pathname) => {
    switch (pathname) {
      // 여행 테마
      case "/users/map": {
        return {
          data: [
            "Asia",
            "Europe",
            "Africa",
            "Oceania",
            "North America",
            "South America",
          ],
        };
      }
      default:
        return;
    }
  };
  let propsData = dataClassification(pathname);
  // useEffect(() => {
  //   console.log(propsData);
  // }, [propsData]);
  const handleNavigate = () => {
    navigate("/users/addPhoto", { state: propsData });
  };
  // ==== 추가 및 변경 부분 END ====
  return (
    <div className="NavThemeBar">
      <div className="leftNav">
        <Link to={"/"} className="Nav">
          <SiteLogo alt="Logo" className="logo" onClick={() => navigate("/")} />
        </Link>
        {/* 상단 텍스트 1 */}
        <div className="topText1" onClick={() => navigate("/users/map")}>
          <TopText content={"Theme\nGallery"} text={true} />
        </div>
        {/* 상단 텍스트 2 */}
        <div className="topText2" onClick={() => navigate("/MyGall")}>
          <TopText content={"My\nGallery"} text={true} />
        </div>
        {/* 상단 텍스트 3 */}
        <div
          className="topText3"
          onClick={() => handleNavigate()}
        >
          <TopText content={"Add\nPhoto"} text={true} />
        </div>
        {/* 검색창 */}
        <div className="searchBox">
          <SearchBox />
        </div>
      </div>
      <div className="rightNav"></div>
    </div>
  );
}

export default NavThemeBar;
