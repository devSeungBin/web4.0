import "./AddPhotoPage.scss";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddPhotoLayouts from "../../Layouts/AddPhotoLayouts/AddPhotoLayouts";
import PhotoBox from "../../components/PhotoBox/PhotoBox";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import UserImgForUpload from "../../components/ImgSwiper/UserImgForUpload";

function AddPhotoPage() {
  const navigate = useNavigate();
  // PhotoBox On / Off
  const [photoBox, setPhotoBox] = useState(false);
  const handlePhotoBox = () => {
    setPhotoBox(!photoBox);
  };

  // 이미지 저장
  const divRef = useRef(null);
  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "download_img.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };
  // 이미지 주소
  const [imageUrl, setImageUrl] = useState("/img/photo.svg");
  // ==== 추가 및 변경 부분 START ====
  // 이동하는 주소에 따라 다른 값 수신
  const location = useLocation();
  const optionData = location.state?.data;
  // ==== 추가 및 변경 부분 END ====
  return (
    <AddPhotoLayouts>
      <div className="AddPhotopage">
        {/* 좌측 구역 */}
        <div className="leftBox">
          <h3>Let's add a Photo!</h3>
          {/* <h4>※ You can upload up to 5 photos</h4> */}
          <div
            className={photoBox ? "addPhotoBtn off" : "addPhotoBtn"}
            onClick={handlePhotoBox}
          >
            <img src={process.env.PUBLIC_URL + "/img/plus.svg"} alt="plus" />
            Add Photo
          </div>
          {photoBox ? (
            <PhotoBox divRef={divRef} setImageUrl={setImageUrl} optionData={optionData} />
          ) : (
            ""
          )}
        </div>
        {/* 우측 구역 */}
        <div className="rightBox">
          {/* Post */}
          <h4>Upload Tools</h4>
          <div className="btnContainer">
            {/* <div className="uploadBtn">Upload Photo</div> */}
            <div className="deleteBtn" onClick={() => navigate(-1)}>
              Stop Upload
            </div>
          </div>
          <h4 className="previewTitle">Preview Photo</h4>
          <div className="preview">
            <UserImgForUpload
              img_path={imageUrl}
              tag={"Tags"}
              date={"2024-05-25"}
              description={"Description"}
            />
          </div>
          {/* Photo Tools */}
          {/* <h4>Photo Tools</h4> */}
          <div className="toolContainer">
            <div
              className={photoBox ? "tool1 off" : "tool1"}
              onClick={handlePhotoBox}
            >
              <img
                src={process.env.PUBLIC_URL + "/img/plus_gray.svg"}
                alt="plus"
              />
              Add Photo
            </div>
            <div className="tool2" onClick={handleDownload}>
              <img
                src={process.env.PUBLIC_URL + "/img/download.svg"}
                alt="download"
              />
              Download Photo
            </div>
          </div>
        </div>
      </div>
    </AddPhotoLayouts>
  );
}

export default AddPhotoPage;
