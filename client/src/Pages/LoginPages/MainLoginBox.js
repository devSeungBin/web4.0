import "./MainLoginBox.scss";
import LoginLayout from "../../Layouts/LoginLayouts/LoginLayout";
import LogoBox from "./LogoBox";
import LoginBox from "./LoginBox";

function MainLoginBox({
  logo,
  setLogo,
  isLogin,
  handleIsLogin,
  handleLogoBox,
  handleAuth,
}) {
  return (
    <LoginLayout>
      <div className="MainBox">
        <LogoBox logo={logo} setLogo={setLogo} handleLogoBox={handleLogoBox} />
        <LoginBox
          logo={logo}
          isLogin={isLogin}
          handleIsLogin={handleIsLogin}
          handleAuth={handleAuth}
        />
      </div>
    </LoginLayout>
  );
}

export default MainLoginBox;
