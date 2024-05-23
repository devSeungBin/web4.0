import "./SportsTheme.scss";
import { useEffect, useState, useRef } from "react";
import { ReactComponent as Sports } from "../../imgs/Sports.svg";
import { ReactComponent as Soccer } from "../../imgs/soccer_Ball.svg";
import { ReactComponent as BasketBall } from "../../imgs/basketBall_Ball.svg";
import { ReactComponent as VolleyBall } from "../../imgs/volleyBall_Ball.svg";
import { ReactComponent as BaseBall } from "../../imgs/baseBall_Ball.svg";
import { ReactComponent as Golf } from "../../imgs/golf_Ball.svg";
import PreviewBox from "../../components/Preview/PreviewBox";
import ImgSwiper from "../../components/ImgSwiper/ImgSwiper";
let SPORTS = "";

function SportsDetail(sports) {
  switch (sports) {
    // sports0 : 축구
    case "sports0":
      SPORTS = "Soccer";
      return <Soccer className="sports" />;
    // sports1 : 농구
    case "sports1":
      SPORTS = "Basket\nBall";
      return <BasketBall className="sports" />;
    // sports2 : 배구
    case "sports2":
      SPORTS = "Volley\nBall";
      return <VolleyBall className="sports" />;
    // sports3 : 야구
    case "sports3":
      SPORTS = "Base\nBall";
      return <BaseBall className="sports" />;
    // sports4 : 골프
    case "sports4":
      SPORTS = "Golf";
      return <Golf className="sports" />;
    default:
      return null;
  }
}

function SportsTheme({ data, imgMokData }) {
  // 로딩 상태 변수
  const [loading, setLoading] = useState(true);
  // preview 관련 변수 -> useState
  const [view, setView] = useState(true);
  // 대륙 상태관리 변수
  const [sports, setSports] = useState(null);
  // 이미지 상태관리 변수
  const [img, setImg] = useState(false);
  const swiperRef = useRef(null);

  function handleView(num) {
    setView(!view);
    setSports(num);
    setImg(!img); // previewBox를 눌렀을 때 이미지 on / off
    swiperRef.current.swiper.slideTo(0);
  }
  // 전체 테마 <-> 개별 테마으로 넘어가기 위한 함수
  const handleBack = () => {
    setView(!view);
    setSports(null);
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
    <div className="SportsTheme">
      {/* 스포츠 */}
      <Sports className={loading ? "off" : `on ${view ? "" : "invis"}`} />
      {/* previewBox */}
      <div className="preview0">
        <PreviewBox
          data={data}
          title={"So\nccer"}
          view={view}
          handleView={handleView}
          num={"sports0"}
        />
      </div>
      <div className="preview1">
        <PreviewBox
          data={data}
          title={"Basket\nBall"}
          view={view}
          handleView={handleView}
          num={"sports1"}
        />
      </div>
      <div className="preview2">
        <PreviewBox
          data={data}
          title={"Volley\nBall"}
          view={view}
          handleView={handleView}
          num={"sports2"}
        />
      </div>
      <div className="preview3">
        <PreviewBox
          data={data}
          title={"Base\nBall"}
          view={view}
          handleView={handleView}
          num={"sports3"}
        />
      </div>
      <div className="preview4">
        <PreviewBox
          data={data}
          title={"Go\nlf"}
          view={view}
          handleView={handleView}
          num={"sports4"}
        />
      </div>
      {/* 개별 테마 */}
      <div className="sportsContainer">{SportsDetail(sports)}</div>
      {/* 개별 테마 <-> 전체 테마로 넘어가기 위한 버튼 */}
      <button className={view ? "off" : "on"} onClick={handleBack}>
        {"Back To\nSports Theme"}
      </button>
      {/* 스포츠별 이름 */}
      <div className={view ? "sports_title off" : "sports_title on"}>
        {SPORTS}
      </div>
      {/* 이미지 */}
      <div className={img ? "imgOn" : "imgOff"}>
        <ImgSwiper imgMokData={imgMokData} img={img} swiperRef={swiperRef} />
      </div>
    </div>
  );
}

export default SportsTheme;
