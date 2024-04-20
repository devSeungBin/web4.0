import "./SignUpBox.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SEVER_URL = "http://localhost:5000/users/registrations";

function SignUpBox({ setLogo }) {

  // 회원가입 여부에 따른 함수 goToMain()
  const navigate = useNavigate();

  // 서버로 데이터 보내기 (post)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email1.value + "@" + e.target.email2.value;
    const password = e.target.pwd.value;
    
    await axios.post(SEVER_URL, { name, email, password })
      .then((res) => {
        const data = res.data;
        alert(data.message);
        navigate(data.redirectURI);
      })
      .catch((err) => {
        const data = err.response.data;
        alert(data.message);
      });
  };

  return (
    <div className="SignUpBox">
      <div className="inner">
        <Link to="/users/login">
          <button className="arrow" onClick={() => setLogo(true)}></button>
        </Link>
        <h1>
          Welcome
          <br />
          Let's Start!
        </h1>
        <form className="signForm" onSubmit={onSubmitHandler}>
          {/* 이름 */}
          <div className="signName">
            <label htmlFor="name_id">이름</label>
            <input
              type="text"
              id="name_id"
              name="name"
              autoComplete="off"
            ></input>
          </div>
          {/* 이메일주소 */}
          <div className="signEmail">
            <label htmlFor="email_id_1">이메일주소</label>
            <div className="multiForm">
              <input
                type="text"
                id="email_id_1"
                name="email1"
                autoComplete="off"
              ></input>
              <span>@</span>
              <input
                type="text"
                id="email_id_2"
                name="email2"
                autoComplete="off"
              ></input>
            </div>
          </div>
          {/* 비밀번호 */}
          <div className="signPassword">
            <label htmlFor="pwd_id">비밀번호</label>
            <input
              type="password"
              id="pwd_id"
              name="pwd"
              autoComplete="off"
            ></input>
          </div>
          {/* 비밀번호 확인 */}
          <div className="signCheckPwd">
            <label htmlFor="checkPwd_id">비밀번호 확인</label>
            <input
              type="password"
              id="checkPwd_id"
              name="checkPwd"
              autoComplete="off"
            ></input>
          </div>
          {/* 휴대폰 번호 */}
          <div className="signPhone">
            <label htmlFor="phone_id_1">휴대폰 번호</label>
            <div className="multiForm">
              <input
                type="text"
                id="phone_id_1"
                name="phone1"
                autoComplete="off"
              ></input>
              <span>-</span>
              <input
                type="text"
                id="phone_id_2"
                name="phone2"
                autoComplete="off"
              ></input>
              <span>-</span>
              <input
                type="text"
                id="phone_id_3"
                name="phone3"
                autoComplete="off"
              ></input>
            </div>
          </div>
          {/* 회원가입 버튼 */}
          <div className="signupBtn">
            <input type="submit" value="회원가입"></input>
          </div>
          {/* copyright */}
          <div className="copyright">
            Copyright 2024. Pagoth Co. All rights reserved.
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpBox;
