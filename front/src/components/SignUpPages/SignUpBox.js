import "./SignUpBox.scss";

function SignUpBox({ handleLoginBox }) {
  return (
    <div className="SignUpBox">
      <div className="inner">
        <button className="arrow" onClick={handleLoginBox}></button>
        <h1>
          Welcome
          <br />
          Let's Start!
        </h1>
        <div className="signForm">
          {/* 이름 */}
          <div className="signName">
            <label for="name_id">이름</label>
            <input type="text" id="name_id" name="name"></input>
          </div>
          {/* 이메일주소 */}
          <div className="signEmail">
            <label for="email_id">이메일주소</label>
            <div className="multiForm">
              <input type="text" id="email_id_1" name="email"></input>
              <span>@</span>
              <input type="text" id="email_id_2" name="email"></input>
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
              <input type="text" id="phone_id_1" name="phone"></input>
              <span>-</span>
              <input type="text" id="phone_id_2" name="phone"></input>
              <span>-</span>
              <input type="text" id="phone_id_3" name="phone"></input>
            </div>
          </div>
        </div>
        {/* 회원가입 버튼 */}
        <div className="signUpBtn">회원가입</div>
        {/* copyright */}
        <div className="copyright">
          Copyright 2024. Pagoth Co. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default SignUpBox;
