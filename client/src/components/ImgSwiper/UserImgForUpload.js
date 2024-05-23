import "./UserImgForUpload.scss";

function UserImgForUpload({ id, img_path, tag, date, description }) {
  return (
    <div className="UserImgForUpload">
      <div className="container">
        <img src={img_path} alt="img" />
        <div className="description">{description}</div>
      </div>
      <h1 className="content">
        [ {tag} ] {date}
      </h1>
    </div>
  );
}

export default UserImgForUpload;
