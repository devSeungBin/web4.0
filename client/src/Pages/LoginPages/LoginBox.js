import "./LoginBox.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Cookies } from "react-cookie";

const LOGIN_URL = "http://43.203.241.227:5000/auth";

function LoginBox({ logo, isLogin, handleIsLogin, handleAuth, handleRefresh }) {
  // className - LoginBox
  const loginClass = `LoginBox ${logo ? "off" : "on"}`;
  // className - innerBox
  const innerClass = `inner ${logo ? "off" : "on"}`;
  // 로그인 성공시 메인페이지로 이동시키기 위한 useNavigate()
  const navigate = useNavigate();

  const cookies = new Cookies();

  useEffect(() => {
    handleAuth((auth, errorCode) => {
      if (auth) {
        alert("로그인 세션이 존재합니다. 메인 페이지로 이동합니다.");
        navigate("/");
      } else if (!auth && errorCode === 202) {
        console.log("재발급 시작");
        handleRefresh((refresh, errorCode) => {
          if (refresh) {
            console.log("재발급 성공");
            alert("로그인 세션이 존재합니다. 메인 페이지로 이동합니다.");
            navigate("/");
          } else if (!refresh && errorCode === 212) {
            alert("로그인 세션이 존재합니다. 메인 페이지로 이동합니다.");
            navigate("/");
          } else if (!refresh && errorCode === 213) {
            alert("로그인 세션이 만료됐습니다. 다시 로그인해 주십시오.");
            cookies.remove("accessToken", { path: "/" });
            cookies.remove("refreshToken", { path: "/" });

            if (isLogin) {
              handleIsLogin();
            }
          } else {
            console.log(
              "토큰이 존재하지 않거나 유효하지 않습니다. 다시 로그인해 주십시오."
            );
            cookies.remove("accessToken", { path: "/" });
            cookies.remove("refreshToken", { path: "/" });

            if (isLogin) {
              handleIsLogin();
            }
          }
        });
      } else {
        console.log(
          "토큰이 존재하지 않거나 유효하지 않습니다. 다시 로그인해 주십시오."
        );
        cookies.remove("accessToken", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });

        if (isLogin) {
          handleIsLogin();
        }
      }
    });
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await axios
      .post(LOGIN_URL, { email, password, withCredentials: true })
      .then((res) => {
        const data = res.data;
        cookies.set("accessToken", data.accessToken, { path: "/" });
        cookies.set("refreshToken", data.refreshToken, { path: "/" });
        if (!isLogin) {
          handleIsLogin();
        }
        alert("로그인에 성공했습니다.");
        navigate("/");
      })
      .catch((err) => {
        const data = err.response.data;
        console.log(data.msg, data.errorCode);

        if (data.errorCode === 230) {
          alert("이메일 또는 비밀번호가 일치하지 않습니다.");
        }
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
