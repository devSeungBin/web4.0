import "./AnimalTheme.scss";
import { useEffect, useState, useRef } from "react";
import { ReactComponent as Animals } from "../../imgs/Animals.svg";
import { ReactComponent as Dog } from "../../imgs/dog.svg";
import { ReactComponent as Duck } from "../../imgs/duck.svg";
import { ReactComponent as Lizard } from "../../imgs/lizard.svg";
import { ReactComponent as Parrot } from "../../imgs/parrot.svg";
import { ReactComponent as Cat } from "../../imgs/cat.svg";
import { ReactComponent as GoldFish } from "../../imgs/goldfish.svg";
import PreviewBox from "../../components/Preview/PreviewBox";
import ImgSwiper from "../../components/ImgSwiper/ImgSwiper";
import axios from "axios";
let ANIMAL = "";

function AnimalDetail(animal) {
  switch (animal) {
    // animal0 : 강아지
    case "animal0":
      ANIMAL = "Dog";
      return <Dog className="animal" />;
    // animal1 : 오리
    case "animal1":
      ANIMAL = "Duck";
      return <Duck className="animal" />;
    // animal2 : 도마뱀
    case "animal2":
      ANIMAL = "Lizard";
      return <Lizard className="animal" />;
    // animal3 : 앵무새
    case "animal3":
      ANIMAL = "Parrot";
      return <Parrot className="animal" />;
    // animal4 : 고양이
    case "animal4":
      ANIMAL = "Cat";
      return <Cat className="animal" />;
    // animal5 : 금붕어
    case "animal5":
      ANIMAL = "GoldFish";
      return <GoldFish className="animal" />;
    default:
      return null;
  }
}

function AnimalTheme({  themeTag1, addThemeTag1, resetThemeTag1, 
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
  const [animal, setAnimal] = useState(null);
  // 이미지 상태관리 변수
  const [img, setImg] = useState(false);
  const swiperRef = useRef(null);
  // 갤러리 내 보여줄 이미지 목록 상태관리 변수
  const [imageList, setImageList] = useState(null);

  const handleView = (num) => {
    setView(!view);
    setAnimal(num);
    setImageList(null);
    switch (num) {
      case "animal0":
        setImageList(themeTag1);
        break;
      case "animal1":
        setImageList(themeTag2);
        break;
      case "animal2":
        setImageList(themeTag3);
        break;
      case "animal3":
        setImageList(themeTag4);
        break;
      case "animal4":
        setImageList(themeTag5);
        break;
      case "animal5":
        setImageList(themeTag6);
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
    setAnimal(null);
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

       // 대륙 별 이미지 정보 (1:Dog, 2:Duck, 3:Lizard, 4:Parrot, 5:Cat, 6:GoldFish)
      images.forEach(image => {
        switch (image.theme_tag) {
          case "Dog":
            addThemeTag1(image);
            break;
          case "Duck":
            addThemeTag2(image);
            break;
          case "Lizard":
            addThemeTag3(image);
            break;
          case "Parrot":
            addThemeTag4(image);
            break;
          case "Cat":
            addThemeTag5(image);
            break;
          case "GoldFish":
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
    <div className="AnimalTheme">
      {/* 스포츠 */}
      <Animals className={loading ? "off" : `on ${view ? "" : "invis"}`} />
      {/* previewBox */}
      <div className="preview0">
        <PreviewBox
          data={ themeTag1.length > 3 ? 
            themeTag1.slice(0, 4)
            : 
            themeTag1
          }
          title={"Dog"}
          view={view}
          handleView={handleView}
          num={"animal0"}
        />
      </div>
      <div className="preview1">
        <PreviewBox
          data={ themeTag2.length > 3 ? 
            themeTag2.slice(0, 4)
            : 
            themeTag2
          }
          title={"Duck"}
          view={view}
          handleView={handleView}
          num={"animal1"}
        />
      </div>
      <div className="preview2">
        <PreviewBox
          data={ themeTag3.length > 3 ? 
            themeTag3.slice(0, 4)
            : 
            themeTag3
          }
          title={"Lizard"}
          view={view}
          handleView={handleView}
          num={"animal2"}
        />
      </div>
      <div className="preview3">
        <PreviewBox
          data={ themeTag4.length > 3 ? 
            themeTag4.slice(0, 4)
            : 
            themeTag4
          }
          title={"Parrot"}
          view={view}
          handleView={handleView}
          num={"animal3"}
        />
      </div>
      <div className="preview4">
        <PreviewBox
          data={ themeTag5.length > 3 ? 
            themeTag5.slice(0, 4)
            : 
            themeTag5
          }
          title={"Cat"}
          view={view}
          handleView={handleView}
          num={"animal4"}
        />
      </div>
      <div className="preview5">
        <PreviewBox
          data={ themeTag6.length > 3 ? 
            themeTag6.slice(0, 4)
            : 
            themeTag6
          }
          title={"GoldFish"}
          view={view}
          handleView={handleView}
          num={"animal5"}
        />
      </div>
      {/* 개별 테마 */}
      <div className="animalContainer">{AnimalDetail(animal)}</div>
      {/* 개별 테마 <-> 전체 테마로 넘어가기 위한 버튼 */}
      <button className={view ? "off" : "on"} onClick={handleBack}>
        {"Back To\nAnimal Theme"}
      </button>
      {/* 스포츠별 이름 */}
      <div className={view ? "animal_title off" : "animal_title on"}>
        {ANIMAL}
      </div>
      {/* 이미지 */}
      <div className={img ? "imgOn" : "imgOff"}>
        <ImgSwiper imageList={imageList} img={img} swiperRef={swiperRef} />
      </div>
    </div>
  );
}

export default AnimalTheme;
