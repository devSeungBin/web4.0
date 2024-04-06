import "./LoginLayout.scss";
import { Link } from "react-router-dom";

function LoginLayout({ children }) {
  return (
    <div className="LoginLayout">
      {/* 홈 이동 버튼 -- 편의성을 위한 임시 배치 */}
      <Link to={"/"} className="Nav"><button>Home</button></Link>
      {children}
    </div>
  );
}

export default LoginLayout;
