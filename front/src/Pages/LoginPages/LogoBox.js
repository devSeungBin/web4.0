import "./LogoBox.scss";
import { useNavigate } from "react-router-dom";

function LogoBox({ logo, setLogo, handleLogoBox }) {
  // className - LogoBox
  const logoClass = `LogoBox ${logo ? "" : "loginOn"}`;
  // className - img
  const imgClass = `${logo ? "" : "loginOn"}`;
  // className - loginButton
  const buttonClass = `${logo ? "" : "off"}`;
  // 로고 클릭시 홈페이지로 이동
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate("/");
    setLogo(true);
  };

  return (
    <div className={logoClass}>
      {/* 로고 이미지 */}
      <img src="/img/SiteLogo2.png" alt="Logo" onClick={handleLogo} className={imgClass}></img>
      {/* 로그인 버튼 */}
      <button onClick={handleLogoBox} className={buttonClass}>
        LOG IN
      </button>
    </div>
  );
}

export default LogoBox;
