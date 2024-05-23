import "./TopText.scss";

function TopText({ content, text }) {
  return (
    <div className="TopText">
      {/* point */}
      <svg
        width="5"
        height="4"
        viewBox="0 0 5 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={ text ? "point on" : "point off"}
      >
        <circle cx="2.56209" cy="2.24216" r="1.6573" fill="#636163" />
      </svg>
      {/* content */}
      <h1 className={ text ? "content on" : "content off" }>{content}</h1>
    </div>
  );
}

export default TopText;
