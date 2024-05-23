import "./PreviewBox.scss";
import PreviewItem from "./PreviewItem";

function PreviewBox({ data, title, view, handleView, num }) {
  return (
    <div className={view ? "PreviewBox vis" : "PreviewBox invis"}>
      <h1>{title}</h1>
      {data.map((item) => (
        <PreviewItem
          key={item.id}
          month={item.month}
          year={item.year}
          handleView={handleView}
          num={num}
        />
      ))}
    </div>
  );
}

export default PreviewBox;
