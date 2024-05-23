import "./PreviewItem.scss";

function PreviewItem({ month, year, handleView, num }) {
  return (
    <div className="PreviewItem" onClick={()=> handleView(num)}>
        <h4>{month}</h4>
        <h4>{year}</h4>
    </div>
  );
}

export default PreviewItem;
