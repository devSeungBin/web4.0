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
import axios from "axios";
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

function SportsTheme({  themeTag1, addThemeTag1, resetThemeTag1, 
                        themeTag2, addThemeTag2, resetThemeTag2,
                        themeTag3, addThemeTag3, resetThemeTag3, 
                        themeTag4, addThemeTag4, resetThemeTag4, 
                        themeTag5, addThemeTag5, resetThemeTag5, 
                        gallery_id }) {
  // 로딩 상태 변수
  const [loading, setLoading] = useState(true);
  // preview 관련 변수 -> useState
  const [view, setView] = useState(true);
  // 대륙 상태관리 변수
  const [sports, setSports] = useState(null);
  // 이미지 상태관리 변수
  const [img, setImg] = useState(false);
  const swiperRef = useRef(null);
   // 갤러리 내 보여줄 이미지 목록 상태관리 변수
   const [imageList, setImageList] = useState(null);

  function handleView(num) {
    setView(!view);
    setSports(num);
    setImageList(null);
    switch (num) {
      case "sports0":
        setImageList(themeTag1);
        break;
      case "sports1":
        setImageList(themeTag2);
        break;
      case "sports2":
        setImageList(themeTag3);
        break;
      case "sports3":
        setImageList(themeTag4);
        break;
      case "sports4":
        setImageList(themeTag5);
        break;
      default:
        return null;
    }
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

  const IMAGE_URL = "http://43.201.249.247:5000/images";

  const test = async () => {
    await axios
    .get(IMAGE_URL, { params: { gallery_id: gallery_id }, withCredentials: true })
    .then((res) => {
      const data = res.data;
      const images = data.images;

       // 대륙 별 이미지 정보 (1:Soccer, 2:BasketBall, 3:VolleyBall, 4:BaseBall, 5:Golf)
      images.forEach(image => {
        switch (image.theme_tag) {
          case "Soccer":
            addThemeTag1(image);
            break;
          case "BasketBall":
            addThemeTag2(image);
            break;
          case "VolleyBall":
            addThemeTag3(image);
            break;
          case "BaseBall":
            addThemeTag4(image);
            break;
          case "Golf":
            addThemeTag5(image);
            break;
          default:
            return null;
        }
      });
    })
    .catch((err) => {
      const data = err.response.data;
      console.log(data);
      
    });
  }

  // 2초 뒤에 지도가 나오도록 조정
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    resetThemeTag1();
    resetThemeTag2();
    resetThemeTag3();
    resetThemeTag4();
    resetThemeTag5();
    test();
  }, []);
  return (
    <div className="SportsTheme">
      {/* 스포츠 */}
      <Sports className={loading ? "off" : `on ${view ? "" : "invis"}`} />
      {/* previewBox */}
      <div className="preview0">
        <PreviewBox
          data={ themeTag1.length > 3 ? 
            themeTag1.slice(0, 4)
            : 
            themeTag1
          }
          title={"So\nccer"}
          view={view}
          handleView={handleView}
          num={"sports0"}
        />
      </div>
      <div className="preview1">
        <PreviewBox
          data={ themeTag2.length > 3 ? 
            themeTag2.slice(0, 4)
            : 
            themeTag2
          }
          title={"Basket\nBall"}
          view={view}
          handleView={handleView}
          num={"sports1"}
        />
      </div>
      <div className="preview2">
        <PreviewBox
          data={ themeTag3.length > 3 ? 
            themeTag3.slice(0, 4)
            : 
            themeTag3
          }
          title={"Volley\nBall"}
          view={view}
          handleView={handleView}
          num={"sports2"}
        />
      </div>
      <div className="preview3">
        <PreviewBox
          data={ themeTag4.length > 3 ? 
            themeTag4.slice(0, 4)
            : 
            themeTag4
          }
          title={"Base\nBall"}
          view={view}
          handleView={handleView}
          num={"sports3"}
        />
      </div>
      <div className="preview4">
        <PreviewBox
          data={ themeTag5.length > 3 ? 
            themeTag5.slice(0, 4)
            : 
            themeTag5
          }
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
        <ImgSwiper imageList={imageList} img={img} swiperRef={swiperRef} />
      </div>
    </div>
  );
}

export default SportsTheme;
