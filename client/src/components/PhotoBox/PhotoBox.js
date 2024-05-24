import "./PhotoBox.scss";
import { useState, useRef, useEffect } from "react";
import TagBox from "../TagBox/TagBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PhotoBox({ divRef, setImageUrl, optionData, gallery_id }) {
  const navigate = useNavigate();
  
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (images[0] === undefined) {
      setImageUrl("/img/photo.svg");
    } else {
      setImageUrl(images[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);
  // 이미지 상대경로 저장
  const handleAddImages = (e) => {
    const imageLists = e.target.files;
    let imageUrlLists = [...images];

    for (let i = 0; i < imageLists.length; i++) {
      const imageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(imageUrl);
    }
    //이미지 개수가 5개 이상이면 slice
    if (imageUrlLists.length > 1) {
      imageUrlLists = imageUrlLists.slice(0, 1);
    }

    setImages(imageUrlLists);
  };

  // 이미지 삭제
  const handleDeleteImage = (id) => {
    setImages(images.filter((_, index) => index !== id));
  };

  // description 값 변수에 저장
  const [text, setText] = useState("");
  // textarea 내부 컨텐츠 길이에 따라 div높이 자동 설정
  const textareaRef = useRef();
  const handleResizeHeight = (e) => {
    textareaRef.current.style.height = "auto"; //height 초기화
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    setText(e.target.value);
  };

  // 서버로 전달할 데이터_1 { 태그, 테마 태그, 설명 }
  const [tags, setTags] = useState([]);
  const tagResult = tags.join("^&*");

  const [themeTag, setThemeTag] = useState("Asia");
  const uploadData = { tag: tagResult, theme_tag: themeTag, descript: text };

  // 서버로 전달할 데이터_2 { 이미지_파일 }
  const [imageData, setImageData] = useState(null);
  // useEffect(() => {
  //   console.log(imageData);
  // }, [imageData]);

  // 이미지(File) 저장
  const onChangeImage = (e) => {
    const formData = new FormData(); // formData 생성
    // formData.append("data", JSON.stringify(uploadData));
    formData.append("pagoth", e.target.files[0]); // 이미지 파일 값 할당
    setImageData(formData);
  };

  // 이미지 파일 전송
  const handleUpload = () => {
    imageData.append("data", JSON.stringify(uploadData));
    if (imageData) {
      axios
        .post(`http://localhost:5000/images?gallery_id=${gallery_id}`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => {
          const data = res.data;

          alert(data.msg);
          navigate(-1);
        })
        .catch((err) => {
          const data = err.response.data;

          console.log(data);
          navigate(-1);
        });
    } else {
      // alert("No image selected");
      return;
    }
  };
  return (
    <div className="PhotoBox">
      {/* 이미지 선택 버튼 || 이미지 업로드 버튼 */}
      <div className="relatedBtn">
        {/* 이미지 선택 버튼 */}
        <label htmlFor="userImg" onChange={handleAddImages}>
          <div className="btn">
            <img
              src={process.env.PUBLIC_URL + "/img/addPhoto.svg"}
              alt="addPhoto"
            />
            Choose Photo
          </div>
          <form action="/upload" method="POST" encType="multipart/form-data">
            <input
              id="userImg"
              type="file"
              // multiple
              accept="image/*"
              name="pagoth"
              onChange={onChangeImage}
            />
          </form>
        </label>
        {/* 이미지 업로드 버튼 */}
        <div className="btn" onClick={handleUpload}>
          <img
            src={process.env.PUBLIC_URL + "/img/upload.svg"}
            alt="downloadIcon"
          />
          Upload Photo
        </div>
      </div>
      {/* 태그 */}
      <div className="tags">
        <TagBox tags={tags} setTags={setTags} />
      </div>
      {/* 사진 업로드 위치 */}
      <div className="selectOption">
        <select
          name="select"
          value={themeTag}
          onChange={(e) => setThemeTag(e.target.value)}
        >
          {/* <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option> */}
          {/* ==== 추가 및 변경 부분 START ==== */}
          {optionData.map((data, index) => (
            <option key={index} value={data}>{data}</option>
          ))}
          {/* ==== 추가 및 변경 부분 END ==== */}
        </select>
      </div>
      {/* 설명 */}
      <div className="description">
        <textarea
          id="textareaInput"
          ref={textareaRef}
          className={
            images.length ? "descriptionInput radius" : "descriptionInput"
          }
          placeholder="Enter description"
          onChange={handleResizeHeight}
          spellCheck="false"
          rows={1}
        ></textarea>
      </div>
      {images.map((image, id) => (
        <div className="imageBox" key={id}>
          <div className="deleteImage" onClick={() => handleDeleteImage(id)}>
            <img
              src={process.env.PUBLIC_URL + "/img/trash.svg"}
              alt="trashIcon"
            />
          </div>
          <img
            className="previewImage"
            src={image}
            alt={`${image}-${id}`}
            ref={divRef}
          />
        </div>
      ))}
    </div>
  );
}

export default PhotoBox;
