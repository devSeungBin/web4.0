import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from '../MainPages/Header';
import './Home.css';
import { Cookies } from "react-cookie";

function Home({ isLogin, handleIsLogin, handleAuth, handleRefresh }) {
    const location = useLocation();
    const navigate = useNavigate();
    const cookies = new Cookies();
  
    // useEffect(() => {
    //   handleAuth((auth, errorCode) => {
    //     if (auth) {
    //     } else if (!auth && errorCode === 202) {
    //       console.log("재발급 시작");
    //       handleRefresh((refresh, errorCode) => {
    //         if (refresh) {
    //           console.log("재발급 성공");
    //           navigate("/");
    //         } else if (!refresh && errorCode === 212) {
    //           navigate("/");
    //         } else if (!refresh && errorCode === 213) {
    //           alert("로그인 세션이 만료됐습니다. 다시 로그인해 주십시오.");
    //           cookies.remove("accessToken", { path: "/" });
    //           cookies.remove("refreshToken", { path: "/" });

    //           if (isLogin) {
    //             handleIsLogin();
    //           }
    //           navigate("/");
    //         } else {
    //           console.log(
    //             "토큰이 존재하지 않거나 유효하지 않습니다. 다시 로그인해 주십시오."
    //           );
    //           cookies.remove("accessToken", { path: "/" });
    //           cookies.remove("refreshToken", { path: "/" });

    //           if (isLogin) {
    //             handleIsLogin();
    //           }
    //           navigate("/");
    //         }
    //       });
    //     } else {
    //       console.log(
    //         "토큰이 존재하지 않거나 유효하지 않습니다. 다시 로그인해 주십시오."
    //       );
    //       cookies.remove("accessToken", { path: "/" });
    //       cookies.remove("refreshToken", { path: "/" });

    //       if (isLogin) {
    //         handleIsLogin();
    //       }
    //       navigate("/");
    //     }
    //   });
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location.pathname]);

    return (
        <>
        <div className='Headerz'>
            <Header isLogin={isLogin} handleIsLogin={handleIsLogin} />
        </div>
        <div className='Outletz'>
            <Outlet />
        </div>
        </>
    );
};

export default Home;