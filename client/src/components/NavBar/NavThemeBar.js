import "./NavThemeBar.scss";
import { Link } from "react-router-dom";
import { ReactComponent as SiteLogo } from "../../imgs/SiteLogo4.svg";
import { useState } from "react";
import TopText from "../TopText/TopText";
import SearchBox from "../SerachBox/SearchBox";


function NavThemeBar() {
  // 상단 텍스트 하이라이트
  const [text, setText] = useState(true);
  return (
    <div className="NavThemeBar">
      <div className="leftNav">
        <Link to={"/"} className="Nav">
          <SiteLogo alt="Logo" className="logo" />
        </Link>
        {/* 상단 텍스트 1 */}
        <TopText content={"Theme\nGallery"} text={text} />
        {/* 상단 텍스트 2 */}
        <TopText content={"Grid\nList"} text={!text} />
        {/* 상단 텍스트 3 */}
        <TopText content={"Add\nPhoto"} text={!text} />
        {/* 검색창 */}
        <SearchBox />
      </div>
      <div className="rightNav">
        <Link to={"/"} className="Nav">홈</Link>
        <Link to={"/users/login"} className="Nav">
          로그인
        </Link>
      </div>
    </div>
  );
}

export default NavThemeBar;
