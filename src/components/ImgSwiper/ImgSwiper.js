import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Mousewheel, Keyboard } from "swiper"; // Swiper에서 가져올 모듈
import UserImg from "./UserImg";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./ImgSwiper.scss";

function ImgSwiper({ imgMokData, swiperRef }) {
  return (
    <Swiper
      ref={swiperRef}
      effect={"coverflow"} // 슬라이더에 사용할 전환 효과 - coverflow
      grabCursor={true} // 슬라이더 위에 마우스를 올리면 콘텐츠를 끌 수 있다
      centeredSlides={true} // true - 활성된 슬라이드가 슬라이더 컨테이너 내부 중앙에 배치
      slidesPerView={3} // 한 번에 표시되는 슬라이드 수 - auto로 설정시 뷰포트 너비에 따라 자동 조정
      coverflowEffect={{
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      }}
      navigation={{
        nextEl: ".nextButton",
        prevEl: ".prevButton",
      }}
      mousewheel={true}
      keyboard={true}
      modules={[EffectCoverflow, Navigation, Mousewheel, Keyboard]}
      className="mySwiper"
    >
      <div className="container">
        {imgMokData.map((img) => (
          <SwiperSlide key={img.id}>
            <UserImg
              img_path={img.img_path}
              tag={img.img_tag}
              date={img.img_date}
              description={img.img_description}
            />
          </SwiperSlide>
        ))}
      </div>
      <div className="prevButton">
        <img
          src={process.env.PUBLIC_URL + "/img/arrow_prev.png"}
          alt="prevButton"
        />
      </div>
      <div className="nextButton">
        <img
          src={process.env.PUBLIC_URL + "/img/arrow_next.png"}
          alt="nextButton"
        />
      </div>
    </Swiper>
  );
}

export default ImgSwiper;
