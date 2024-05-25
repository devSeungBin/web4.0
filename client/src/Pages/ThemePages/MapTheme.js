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
import axios from "axios";
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

function MapTheme({ themeTag1, addThemeTag1, resetThemeTag1, 
                    themeTag2, addThemeTag2, resetThemeTag2,
                    themeTag3, addThemeTag3, resetThemeTag3, 
                    themeTag4, addThemeTag4, resetThemeTag4, 
                    themeTag5, addThemeTag5, resetThemeTag5, 
                    themeTag6, addThemeTag6, resetThemeTag6,
                    gallery_id }) {
  // 로딩 상태 변수
  const [loading, setLoading] = useState(true);
  // preview 관련 변수 -> useState
  const [view, setView] = useState(true);
  // 대륙 상태관리 변수
  const [continent, setContinent] = useState(null);
  // 이미지 상태관리 변수
  const [img, setImg] = useState(false);
  const swiperRef = useRef(null);
  // 갤러리 내 보여줄 이미지 목록 상태관리 변수
  const [imageList, setImageList] = useState(null);

  const handleView = (num) => {
    setView(!view);
    setContinent(num);
    setImageList(null);
    switch (num) {
      // continent0 : 아시아
      case "continent0":
        setImageList(themeTag1);
        break;
      // continent1 : 유럽
      case "continent1":
        setImageList(themeTag2);
        break;
      // continent2 : 아프리카
      case "continent2":
        setImageList(themeTag3);
        break;
      // continent3 : 오세아니아
      case "continent3":
        setImageList(themeTag4);
        break;
      // continent4 : 북아메리카
      case "continent4":
        setImageList(themeTag5);
        break;
      // continent5 : 남아메리카
      case "continent5":
        setImageList(themeTag6);
        break;
      default:
        return null;
    }
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

  const IMAGE_URL = "http://43.203.241.227:5000/images";

  const test = async () => {
    await axios
    .get(IMAGE_URL, { params: { gallery_id: gallery_id }, withCredentials: true })
    .then((res) => {
      const data = res.data;
      const images = data.images;

       // 대륙 별 이미지 정보 (1:Asia, 2:Europe, 3:Africa, 4:Oceania, 5:NorthAmerica, 6:SouthAmerica)
      images.forEach(image => {
        switch (image.theme_tag) {
          // 아시아
          case "Asia":
            addThemeTag1(image);
            break;
          // 유럽
          case "Europe":
            addThemeTag2(image);
            break;
          // 아프리카
          case "Africa":
            addThemeTag3(image);
            break;
          // 오세아니아
          case "Oceania":
            addThemeTag4(image);
            break;
          // 북아메리카
          case "North America":
            addThemeTag5(image);
            break;
          // 남아메리카
          case "South America":
            addThemeTag6(image);
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
    resetThemeTag6();
    test();
  }, []);

  return (
    <div className="MapTheme">
      {/* 세계지도 */}
      <Map className={loading ? "off" : `on ${view ? "" : "invis"}`} />
      {/* previewBox */}
      <div className="preview0">
        <PreviewBox
          data={ themeTag1.length > 3 ? 
            themeTag1.slice(0, 4)
            : 
            themeTag1
          }
          title={"A\nsia"}
          view={view}
          handleView={handleView}
          num={"continent0"}
        />
      </div>
      <div className="preview1">
        <PreviewBox
          data={ themeTag2.length > 3 ? 
            themeTag2.slice(0, 4)
            : 
            themeTag2
          }
          title={"Eu\nrope"}
          view={view}
          handleView={handleView}
          num={"continent1"}
        />
      </div>
      <div className="preview2">
        <PreviewBox
          data={ themeTag3.length > 3 ? 
            themeTag3.slice(0, 4)
            : 
            themeTag3
          }
          title={"Af\nrica"}
          view={view}
          handleView={handleView}
          num={"continent2"}
        />
      </div>
      <div className="preview3">
        <PreviewBox
          data={ themeTag4.length > 3 ? 
            themeTag4.slice(0, 4)
            : 
            themeTag4
          }
          title={"Oce\nania"}
          view={view}
          handleView={handleView}
          num={"continent3"}
        />
      </div>
      <div className="preview4">
        <PreviewBox
          data={ themeTag5.length > 3 ? 
            themeTag5.slice(0, 4)
            : 
            themeTag5
          }
          title={"North\nAmerica"}
          view={view}
          handleView={handleView}
          num={"continent4"}
        />
      </div>
      <div className="preview5">
        <PreviewBox
          data={ themeTag6.length > 3 ? 
            themeTag6.slice(0, 4)
            : 
            themeTag6
          }
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
        <ImgSwiper imageList={imageList} img={img} swiperRef={swiperRef} />
      </div>
    </div>
  );
}

export default MapTheme;
