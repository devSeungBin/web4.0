import { useNavigate } from "react-router-dom";
import "./MyGall.css";
import { useEffect } from "react";
import axios from "axios";

const GALLERY_URL = "http://43.201.249.247:5000/galleries";

function MyGall({ galleryItems, addGalleryItem, resetGalleryItem }) {
  const navigate = useNavigate();

  const test = async () => {
    await axios
    .get(GALLERY_URL, { withCredentials: true })
    .then((res) => {
      const data = res.data;
      const galleries = data.galleries
      galleries.forEach(gallery => {  
        addGalleryItem(gallery)
      });
    })
    .catch((err) => {
      const data = err.response.data;
      console.log(data)
      console.log(data.msg, data.errorCode);

    });
  }

  useEffect(() => {
    resetGalleryItem();
    test();
    console.log(galleryItems)
  }, []);

  // 갤러리 클릭시, 생성 당시 선택한 테마에 따른 페이지로 이동
  const handleThemePage = (themeNum) => {
    switch (themeNum) {
      // 여행 테마
      case "1":
        navigate("/users/map");
        break;
      // 운동 테마
      case "2":
        navigate("/users/sports");
        return;
      // 장소 테마
      case "3":
        navigate("/users/location");
        return;
      // DD 테마
      case "4":
        return;
      default:
        return;
    }
  };
  return (
    <div className="MyGallcontainer">
      <img src="img/Backimg.png" className="Backimg" alt="Backimg"></img>
      <div className="MainTextBox">
        <h1 className="MainText">Check it out & Create a new gallery!</h1>
      </div>
      {/* 갤러리 추가 버튼들 */}
      <div className={`AddBox1`} onClick={() => navigate("/Create")}>
        <img className="AddIcon" src="img/Add.png" alt="Add" />
      </div>

      {/* 갤러리 아이템들 */}
      {galleryItems.length > 0 ? (
        galleryItems.map((item, index) => (
          <div
            key={index}
            className={`box${index + 1}`}
            onClick={() => handleThemePage(galleryItems[index].theme)}
          >
            <div className="GallBox">
              {/* 추가 */}
              {item.thumbnail && (
                <img
                  // src={item.thumbnail}
                  src={process.env.PUBLIC_URL + item.thumbnail}
                  alt="Thumbnail"
                  className="MyGallthumbnail"
                ></img>
              )}
              {/* 갤러리 아이템 정보를 표시합니다 */}
              <div className="GalleryBox">
                <h3 className="GalleryName">{item?.title || "Untitled"}</h3>
                {/* <p className='GalleryExplan'>{item.explanation}</p> */}
                <div className="LinkBox">
                  <button className="Linkbtn">
                    <img
                      className="LinkImg"
                      src="img/share.svg"
                      alt="Share"
                    ></img>
                  </button>
                </div>
                <div className="GroupBox">
                  <button className="Groupbtn">
                    <img
                      className="GroupImg"
                      src="img/group.svg"
                      alt="Share"
                    ></img>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default MyGall;
