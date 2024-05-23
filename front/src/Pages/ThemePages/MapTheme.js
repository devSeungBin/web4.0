import "./MapTheme.scss";
import { useEffect, useState, useRef } from "react";
import { ReactComponent as Map } from "../../imgs/world.svg";
import { ReactComponent as Asia } from "../../imgs/asia.svg";
import { ReactComponent as Europe } from "../../imgs/europe.svg";
import { ReactComponent as Africa } from "../../imgs/africa.svg";
import { ReactComponent as Oceania } from "../../imgs/oceania.svg";
import { ReactComponent as NorthAmerica } from "../../imgs/northAmerica.svg";
import { ReactComponent as SouthAmerica } from "../../imgs/southAmerica.svg";
import PreviewBox from "../../components/Preview/PreviewBox";
import ImgSwiper from "../../components/ImgSwiper/ImgSwiper";
let CONTINENT = "";

function Continent(continent) {
  switch (continent) {
    // continent0 : 아시아
    case "continent0":
      CONTINENT = "Asia";
      return <Asia className="continent" />;
    // continent1 : 유럽
    case "continent1":
      CONTINENT = "Europe";
      return <Europe className="continent" />;
    // continent2 : 아프리카
    case "continent2":
      CONTINENT = "Africa";
      return <Africa className="continent" />;
    // continent3 : 오세아니아
    case "continent3":
      CONTINENT = "Oceania";
      return <Oceania className="continent" />;
    // continent4 : 북아메리카
    case "continent4":
      CONTINENT = "North\nAmerica";
      return <NorthAmerica className="continent" />;
    // continent5 : 남아메리카
    case "continent5":
      CONTINENT = "South\nAmerica";
      return <SouthAmerica className="continent" />;
    default:
      return null;
  }
}

function MapTheme({ data, imgMokData }) {
  // 로딩 상태 변수
  const [loading, setLoading] = useState(true);
  // preview 관련 변수 -> useState
  const [view, setView] = useState(true);
  // 대륙 상태관리 변수
  const [continent, setContinent] = useState(null);
  // 이미지 상태관리 변수
  const [img, setImg] = useState(false);
  const swiperRef = useRef(null);

  function handleView(num) {
    setView(!view);
    setContinent(num);
    setImg(!img); // previewBox를 눌렀을 때 이미지 on / off
    swiperRef.current.swiper.slideTo(0);
  }
  // 전체 대륙 <-> 개별 대륙으로 넘어가기 위한 함수
  const handleBack = () => {
    setView(!view);
    setContinent(null);
    setImg(!img);
    swiperRef.current.swiper.slideTo(0);
  };
  // 2초 뒤에 지도가 나오도록 조정
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="MapTheme">
      {/* 세계지도 */}
      <Map className={loading ? "off" : `on ${view ? "" : "invis"}`} />
      {/* previewBox */}
      <div className="preview0">
        <PreviewBox
          data={data}
          title={"A\nsia"}
          view={view}
          handleView={handleView}
          num={"continent0"}
        />
      </div>
      <div className="preview1">
        <PreviewBox
          data={data}
          title={"Eu\nrope"}
          view={view}
          handleView={handleView}
          num={"continent1"}
        />
      </div>
      <div className="preview2">
        <PreviewBox
          data={data}
          title={"Af\nrica"}
          view={view}
          handleView={handleView}
          num={"continent2"}
        />
      </div>
      <div className="preview3">
        <PreviewBox
          data={data}
          title={"Oce\nania"}
          view={view}
          handleView={handleView}
          num={"continent3"}
        />
      </div>
      <div className="preview4">
        <PreviewBox
          data={data}
          title={"North\nAmerica"}
          view={view}
          handleView={handleView}
          num={"continent4"}
        />
      </div>
      <div className="preview5">
        <PreviewBox
          data={data}
          title={"South\nAmerica"}
          view={view}
          handleView={handleView}
          num={"continent5"}
        />
      </div>
      {/* 대륙 */}
      <div className="continentContainer">{Continent(continent)}</div>
      {/* 대륙 <-> 전체대륙으로 넘어가기 위한 버튼 */}
      <button className={view ? "off" : "on"} onClick={handleBack}>
        {"Back To\nWorld Map"}
      </button>
      {/* 대륙별 이름 */}
      <div className={view ? "continent_title off" : "continent_title on"}>
        {CONTINENT}
      </div>
      {/* 이미지 */}
      <div className={img ? "imgOn" : "imgOff"}>
        <ImgSwiper imgMokData={imgMokData} img={img} swiperRef={swiperRef} />
      </div>
    </div>
  );
}

export default MapTheme;
