import "./UserImg.scss";

function UserImg({ img_path, tag, date, description }) {
  // ==== 추가 및 변경 부분 START ====
  // 서버에서 오는 태그 + 구분자 문자열 -> 다시 배열로 변경
  const tagWithSeparator = tag.split("^&*");
  const tags = tagWithSeparator.join(", ");
  // ==== 추가 및 변경 부분 END ====
  return (
    <div className="UserImg">
      <div className="container">
        <img src={img_path} alt="img" />
        <div className="description">{description}</div>
      </div>
      <h4 className="content">
        [ {tags} ] {date}
      </h4>
    </div>
  );
}

export default UserImg;
