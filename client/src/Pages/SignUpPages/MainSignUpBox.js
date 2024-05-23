import "./MainSignUpBox.scss";
import LoginLayout from "../../Layouts/LoginLayouts/LoginLayout";
import SignUpBox from "./SignUpBox";

function MainSignUpBox({ setLogo }) {
  return (
    <LoginLayout>
      <div className="MainSignUpBox">
        <SignUpBox setLogo={setLogo} />
      </div>
    </LoginLayout>
  );
}

export default MainSignUpBox;
