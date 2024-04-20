import "./LoginBox.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Cookies } from 'react-cookie';

const SEVER_URL = "http://localhost:5000/users/login";

function LoginBox({ logo, isLogin, handleIsLogin, handleAuth }) {
  // className - LoginBox
  const loginClass = `LoginBox ${logo ? "off" : "on"}`;
  // className - innerBox
  const innerClass = `inner ${logo ? "off" : "on"}`;
  // 로그인 성공시 메인페이지로 이동시키기 위한 useNavigate()
  const navigate = useNavigate();

  const cookies = new Cookies();

  useEffect(() => {
    handleAuth((move, redirectURI) => {
      if(move) {
        navigate(redirectURI);
      } else {
        alert('이미 로그인 중 입니다.');
        navigate('/');
      }
    });
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await axios.post(SEVER_URL, { email, password, withCredentials: true })
    .then((res) => {
      const data = res.data;
      cookies.set('accessToken', data.accessToken);
      cookies.set('refreshToken', data.refreshToken);
      if (!isLogin) {
        handleIsLogin();
      }
      alert(data.message);
      navigate(data.redirectURI);
    })
    .catch((err) => {
      const data = err.response.data;
      alert(data.message);
    });
  };

  return (
    <form className={loginClass} onSubmit={onSubmitHandler}>
      <div className={innerClass}>
        <h1>Pagoth</h1>
        <input
          type="text"
          id="email"
          name="email"
          className="userBox"
          placeholder="이메일 주소"
          autoComplete="off"
        />
        <input
          type="password"
          id="password"
          name="password"
          className="userBox"
          placeholder="패스워드"
          autoComplete="off"
        />
        <input type="submit" className="login" value="로그인" />
        <Link to="/users/registrations" style={{ textDecoration: "none" }}>
          <span>회원가입</span>
        </Link>
      </div>
    </form>
  );
}

export default LoginBox;
