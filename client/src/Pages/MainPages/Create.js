import "./Create.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 테마 선택 버튼에 따른 테마 svg 출력 컴포넌트
const ThemeImg = ({ theme }) => {
  const renderSVG = () => {
    switch (theme) {
      case 1:
        return (
          <img
            className="themeImg"
            src={process.env.PUBLIC_URL + "/img/worldMap.png"}
            alt="worldMap"
          />
        );
      case 2:
        return (
          <img
            className="themeImg"
            src={process.env.PUBLIC_URL + "/img/sportsTheme.png"}
            alt="sports"
          />
        );
      case 3:
        return 3;
      case 4:
        return 4;
      default:
        return null;
    }
  };

  return renderSVG();
};

function Create({ addGalleryItem }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState(null);
  const [descript, setDescript] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [imageData, setImageData] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptChange = (e) => {
    setDescript(e.target.value);
  };

  const handleThumbnailChange = (e) => {
    // ==== 추가 및 변경 부분 START ====
    const formData = new FormData(); // formData 생성
    formData.append("pagoth", e.target.files[0]); // 이미지 파일 값 할당
    setImageData(formData);
    // ==== 추가 및 변경 부분 END ====

    const file = e.target.files[0]; // 업로드된 파일을 가져옴
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result); // 파일을 읽은 후 썸네일 상태 업데이트
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
  };

  const handleCreate = () => {
    if (title.trim() && theme) {

      if (!imageData) {
        
        const myData = {
          title: title,
          theme: theme,
          descript: descript
        }

        axios
          .post("http://localhost:5000/galleries", myData, {
            withCredentials: true,
          })
          .then((res) => {
            const data = res.data;
            alert(data.msg);
            navigate("/mygall");
          })
          .catch((err) => {
            const data = err.response.data;
            alert(data.msg);
          });

      } else {
        imageData.append("data", JSON.stringify({title: title, theme: theme, descript: descript}));
        axios
          .post("http://localhost:5000/galleries", imageData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          })
          .then((res) => {
            const data = res.data;
            alert(data.msg);
            navigate("/mygall");
          })
          .catch((err) => {
            const data = err.response.data;
            alert(data.msg);
          });
      }

      
    } else {
      alert("Title or Theme is required");
    }
  };

  // 테마 선택 버튼 활성화 || 비활성화
  const [activeButton, setActiveButton] = useState(null); // 활성화된 버튼 번호 저장 (null: 비활성화 상태)

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(activeButton === buttonNumber ? null : buttonNumber); // 토글 로직
    const newActiveButton = activeButton === buttonNumber ? null : buttonNumber;
    setTheme(newActiveButton);
  };

  return (
    <div className={`containerA ${isSignUp ? "active" : ""}`}>
      <div className="form-containerA sign-up">
        {/* ==== 추가 및 변경 부분 START ==== */}
        <form
          className="FormContainer"
          action="/upload"
          method="POST"
          encType="multipart/form-data"
        >
          <h1>Create Gallery</h1>
          {/* <span>or use your email for registration</span> */}
          <span>Write the title, description and thumbnail of the gallery</span>
          {/* 썸네일 미리보기 */}
          <div className="thumbnailBox">
            {title ? (
              ""
            ) : thumbnail ? (
              ""
            ) : (
              <h1>Write the title{"\n"}Hover on screen</h1>
            )}
            <div className="thumbnail_text">
              <h1>{title}</h1>
            </div>
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="thumbnail-preview"
              />
            )}
          </div>
          <label htmlFor="thumbnailImg" className="thumbnailInput">
            <span>Choose Thumbnail</span>
            {/* 썸네일 업로드 입력 추가 */}
            <input
              id="thumbnailImg"
              type="file"
              accept="image/*"
              name="thumbnail"
              onChange={handleThumbnailChange}
            />
          </label>
          {/* ==== 추가 및 변경 부분 END ==== */}
          <input
            id="titleInput"
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <input
            id="descriptInput"
            type="text"
            placeholder="Descript"
            value={descript}
            onChange={handleDescriptChange}
          />
          <button className="originBtn" type="button" onClick={handleCreate}>
            Create!
          </button>
        </form>
      </div>
      <div className="form-containerA sign-in">
        <form>
          <h1>Choose a theme</h1>
          <div className="social-icons">
            {Array.from({ length: 4 }, (_, index) => index + 1).map(
              (buttonNumber) => (
                <div
                  key={buttonNumber}
                  className={`themeBtn btn${buttonNumber}`}
                  onClick={() => handleButtonClick(buttonNumber)}
                  style={{
                    backgroundColor:
                      activeButton === buttonNumber ? "#5c6bc0" : "#ccc", // 활성화 여부에 따라 배경색 변경
                  }}
                  onMouseEnter={() => {
                    const styleBtn = document.querySelector(
                      `.btn${buttonNumber}`
                    ).style;
                    styleBtn.backgroundColor = "#5c6bc0"; // hover 시 배경색 변경
                  }}
                  onMouseLeave={() => {
                    const styleBtn = document.querySelector(
                      `.btn${buttonNumber}`
                    ).style;
                    styleBtn.backgroundColor =
                      activeButton === buttonNumber ? "#5c6bc0" : "#ccc"; // 원래 색상으로 돌아옴
                  }}
                ></div>
              )
            )}
          </div>
          <span>Choose the theme you want!</span>
          <div className="ThemeImgBox">
            {activeButton ? <ThemeImg theme={theme} /> : null}
          </div>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div
            className={`toggle-panel ${
              isSignUp ? "toggle-left" : "toggle-right"
            }`}
          >
            <h1>{isSignUp ? "Hello, Friend!" : "Welcome Back!"}</h1>
            <p>
              {isSignUp
                ? "Register your information to use the gallery function"
                : "Start your gallery by selecting your favorite theme"}
            </p>
            <button
              className={`originBtn hidden ${isSignUp ? "hidden" : ""}`}
              onClick={toggleForm}
            >
              {isSignUp ? "PREV" : "NEXT"}
            </button>
          </div>
          <div
            className={`toggle-panel ${
              isSignUp ? "toggle-right" : "toggle-left"
            }`}
          >
            <h1>{isSignUp ? "Welcome Back!" : "Hello, Friend!"}</h1>
            <p>
              {isSignUp
                ? "Start your gallery by selecting your favorite theme"
                : "Register your information to use the gallery function"}
            </p>
            <button
              className={`hidden ${isSignUp ? "" : "hidden"}`}
              onClick={toggleForm}
            >
              Prev
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
