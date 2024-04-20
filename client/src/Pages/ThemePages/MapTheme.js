import "./MapTheme.scss";
import { useEffect, useState } from "react";
import { ReactComponent as Map } from "../../imgs/world.svg"


function MapTheme() {
  // 로딩 상태 변수
  const [loading, setLoading] = useState(true);
  // 최초 마운트시 로딩 스피너 표시 | 1초 뒤 사라지게 설정
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="MapTheme">
      <Map className={loading ? "off" : "on"} />
    </div>
  );
}

export default MapTheme;
