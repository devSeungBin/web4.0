import "./NavBar.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from 'react-cookie';

const SEVER_URL = "http://localhost:5000/users/logout";

function NavBar ({ isLogin, handleIsLogin }) {

  const navigate = useNavigate();
  const cookies = new Cookies();

  const logoutHandler = async () => {
    if (!isLogin) {
      return
    }

    await axios.get(SEVER_URL, { withCredentials: true })
    .then((res) => {
      const data = res.data;
      cookies.remove('accessToken');
      cookies.remove('refreshToken');
      if (isLogin) {
        handleIsLogin();
      }
      alert(data.message);
      window.location.replace("/");
    })
    .catch((err) => {
      const data = err.response.data;
      alert(data.message);
      navigate(data.redirectURI);
    });
  };

  return (
    <div className="NavBar">
      <Link to={"/map"} className="Nav">테마</Link>
      <Link to={"/"} className="Nav">홈</Link>
      <Link to={isLogin ? "/" : "/users/login"} className="Nav" id="text" onClick={logoutHandler}>{isLogin ? '로그아웃' : '로그인'}</Link>
    </div>
  );
}

export default NavBar;
