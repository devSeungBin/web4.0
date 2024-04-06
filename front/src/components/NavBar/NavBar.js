import { Link } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  return (
    <div className="NavBar">
      <Link to={"/"} className="Nav">홈</Link>
      <Link to={"/login"} className="Nav">로그인</Link>
    </div>
  );
}

export default NavBar;
