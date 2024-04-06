import "./SignUpBox.scss";
import { Link } from "react-router-dom";

function SignUpBox({ onSubmitHandler, todoList }) {
  return (
    <div className="SignUpBox">
      <div className="inner">
        <Link to="/login">
          <button className="arrow"></button>
        </Link>
        <h1>
          Welcome
          <br />
          Let's Start!
        </h1>
        <form className="signForm" onSubmit={onSubmitHandler}>
          {/* 이름 */}
          <div className="signName">
            <label for="name_id">이름</label>
            <input type="text" id="name_id" name="name"></input>
          </div>
          {/* 이메일주소 */}
          <div className="signEmail">
            <label for="email_id">이메일주소</label>
            <div className="multiForm">
              <input type="text" id="email_id_1" name="email1"></input>
              <span>@</span>
              <input type="text" id="email_id_2" name="email2"></input>
            </div>
          </div>
          {/* 비밀번호 */}
          <div className="signPassword">
            <label for="pwd_id">비밀번호</label>
            <input type="password" id="pwd_id" name="pwd"></input>
          </div>
          {/* 비밀번호 확인 */}
          <div className="signCheckPwd">
            <label for="checkPwd_id">비밀번호 확인</label>
            <input type="password" id="checkPwd_id" name="checkPwd"></input>
          </div>
          {/* 휴대폰 번호 */}
          <div className="signPhone">
            <label for="phone_id">휴대폰 번호</label>
            <div className="multiForm">
              <input type="text" id="phone_id_1" name="phone1"></input>
              <span>-</span>
              <input type="text" id="phone_id_2" name="phone2"></input>
              <span>-</span>
              <input type="text" id="phone_id_3" name="phone3"></input>
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
          {/* todoList */}
          {todoList?.map((todo) => (
            <div key={todo.id} style={{ display: "flex", color: "black" }}>
              <div>{todo.name}</div>
              <div>{todo.email1}</div>
              <div>{todo.email2}</div>
              <div>{todo.pwd}</div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

export default SignUpBox;
