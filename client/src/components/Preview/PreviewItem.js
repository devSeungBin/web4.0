import "./PreviewItem.scss";

function PreviewItem({ month, year, handleView, num }) {

  const monthStr = (data) => {
    switch (data) {
      case "1":
        return "January"
      case "2":
        return "February"
      case "3":
        return "March"
      case "4":
        return "April"
      case "5":
        return "May"
      case "6":
        return "June"
      case "7":
        return "July"
      case "8":
        return "August"
      case "9":
        return "September"
      case "10":
        return "October"
      case "11":
        return "Novbember"
      case "12":
        return "December"
      default:
        return null;
    }
  }


  return (
    <div className="PreviewItem" onClick={()=> handleView(num)}>
        <h4>{monthStr(month)}</h4>
        <h4>{year}</h4>
    </div>
  );
}

export default PreviewItem;
