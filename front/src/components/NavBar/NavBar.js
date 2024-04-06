import "./NavBar.scss";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="NavBar">
      <Link to={"/"} className="Nav">홈</Link>
      <Link to={"/users/login"} className="Nav">로그인</Link>
    </div>
  );
}

export default NavBar;
