import "./FoodTheme.scss";
import { useEffect, useState, useRef } from "react";
import { ReactComponent as Food } from "../../imgs/Food.svg";
import { ReactComponent as Drink } from "../../imgs/drink.svg";
import { ReactComponent as Meat } from "../../imgs/meat.svg";
import { ReactComponent as Salad } from "../../imgs/salad.svg";
import { ReactComponent as SeaFood } from "../../imgs/seafood.svg";
import { ReactComponent as Noodle } from "../../imgs/noodle.svg";
import PreviewBox from "../../components/Preview/PreviewBox";
import ImgSwiper from "../../components/ImgSwiper/ImgSwiper";
import axios from "axios";
let FOOD = "";

function FoodDetail(food) {
  switch (food) {
    // food0 : 음료
    case "food0":
      FOOD = "Drink";
      return <Drink className="food" />;
    // food1 : 고기
    case "food1":
      FOOD = "Meat";
      return <Meat className="food" />;
    // food2 : 샐러드
    case "food2":
      FOOD = "Salad";
      return <Salad className="food" />;
    // food3 : 해산물
    case "food3":
      FOOD = "Seafood";
      return <SeaFood className="food" />;
    // food4 : 면
    case "food4":
      FOOD = "Noodle";
      return <Noodle className="food" />;
    default:
      return null;
  }
}

function FoodTheme({  themeTag1, addThemeTag1, resetThemeTag1, 
                      themeTag2, addThemeTag2, resetThemeTag2,
                      themeTag3, addThemeTag3, resetThemeTag3, 
                      themeTag4, addThemeTag4, resetThemeTag4, 
                      themeTag5, addThemeTag5, resetThemeTag5, 
                      gallery_id }) {
  // 로딩 상태 변수
  const [loading, setLoading] = useState(true);
  // preview 관련 변수 -> useState
  const [view, setView] = useState(true);
  // 디데일 테마 상태관리 변수
  const [food, setFood] = useState(null);
  // 이미지 상태관리 변수
  const [img, setImg] = useState(false);
  const swiperRef = useRef(null);
  // 갤러리 내 보여줄 이미지 목록 상태관리 변수
  const [imageList, setImageList] = useState(null);

  function handleView(num) {
    setView(!view);
    setFood(num);
    setImageList(null);
    switch (num) {
      case "food0":
        setImageList(themeTag1);
        break;
      case "food1":
        setImageList(themeTag2);
        break;
      case "food2":
        setImageList(themeTag3);
        break;
      case "food3":
        setImageList(themeTag4);
        break;
      case "food4":
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
    setFood(null);
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

       // 대륙 별 이미지 정보 (1:Drink, 2:Meat, 3:Salad, 4:Seafood, 5:Noodle)
      images.forEach(image => {
        switch (image.theme_tag) {
          case "Drink":
            addThemeTag1(image);
            break;
          case "Meat":
            addThemeTag2(image);
            break;
          case "Salad":
            addThemeTag3(image);
            break;
          case "Seafood":
            addThemeTag4(image);
            break;
          case "Noodle":
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
    <div className="FoodTheme">
      {/* 스포츠 */}
      <Food className={loading ? "off" : `on ${view ? "" : "invis"}`} />
      {/* previewBox */}
      <div className="preview0">
        <PreviewBox
          data={ themeTag1.length > 3 ? 
            themeTag1.slice(0, 4)
            : 
            themeTag1
          }
          title={"Drink"}
          view={view}
          handleView={handleView}
          num={"food0"}
        />
      </div>
      <div className="preview1">
        <PreviewBox
          data={ themeTag2.length > 3 ? 
            themeTag2.slice(0, 4)
            : 
            themeTag2
          }
          title={"Meat"}
          view={view}
          handleView={handleView}
          num={"food1"}
        />
      </div>
      <div className="preview2">
        <PreviewBox
          data={ themeTag3.length > 3 ? 
            themeTag3.slice(0, 4)
            : 
            themeTag3
          }
          title={"Salad"}
          view={view}
          handleView={handleView}
          num={"food2"}
        />
      </div>
      <div className="preview3">
        <PreviewBox
          data={ themeTag4.length > 3 ? 
            themeTag4.slice(0, 4)
            : 
            themeTag4
          }
          title={"SeaFood"}
          view={view}
          handleView={handleView}
          num={"food3"}
        />
      </div>
      <div className="preview4">
        <PreviewBox
          data={ themeTag5.length > 3 ? 
            themeTag5.slice(0, 4)
            : 
            themeTag5
          }
          title={"Noodle"}
          view={view}
          handleView={handleView}
          num={"food4"}
        />
      </div>
      {/* 디테일 테마 */}
      <div className="FoodContainer">{FoodDetail(food)}</div>
      {/* 디테일 테마 <-> 전체 테마로 넘어가기 위한 버튼 */}
      <button className={view ? "off" : "on"} onClick={handleBack}>
        {"Back To\nFood Theme"}
      </button>
      {/* 디테일 테마별 이름 */}
      <div className={view ? "food_title off" : "food_title on"}>
        {FOOD}
      </div>
      {/* 이미지 */}
      <div className={img ? "imgOn" : "imgOff"}>
        <ImgSwiper imageList={imageList} img={img} swiperRef={swiperRef} />
      </div>
    </div>
  );
}

export default FoodTheme;
