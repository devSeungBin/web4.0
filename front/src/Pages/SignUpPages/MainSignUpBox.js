import "./MainSignUpBox.scss";
import LoginLayout from "../../Layouts/LoginLayouts/LoginLayout";
import SignUpBox from "./SignUpBox";

function MainSignUpBox() {
  return (
    <LoginLayout>
      <div className="MainSignUpBox">
        <SignUpBox />
      </div>
    </LoginLayout>
  );
}

export default MainSignUpBox;
