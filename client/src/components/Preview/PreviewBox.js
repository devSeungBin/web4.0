import "./PreviewBox.scss";
import PreviewItem from "./PreviewItem";

function PreviewBox({ data, title, view, handleView, num }) {
  return (
    <div className={view ? "PreviewBox vis" : "PreviewBox invis"}>
      <h1>{title}</h1>
      {data.map((item) => (
        <PreviewItem
          key={item.id}
          month={item.createdAt.slice(6, 7)}
          year={item.createdAt.slice(0, 4)}
          handleView={handleView}
          num={num}
        />
      ))}
    </div>
  );
}

export default PreviewBox;
