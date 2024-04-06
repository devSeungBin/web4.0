import "./MainLoginBox.scss";
import LoginLayout from "../../Layouts/LoginLayouts/LoginLayout";
import LogoBox from "./LogoBox";
import LoginBox from "./LoginBox";

function MainLoginBox({ logo, handleLogoBox }) {
  return (
    <LoginLayout>
      <div className="MainBox">
        <LogoBox logo={logo} handleLogoBox={handleLogoBox} />
        <LoginBox logo={logo} />
      </div>
    </LoginLayout>
  );
}

export default MainLoginBox;
