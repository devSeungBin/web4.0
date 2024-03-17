import React from "react";
import "./LogoBox.scss";
import LogoImg from "../img/MH_Logo1.png";

function LogoBox() {
  return (
    <div className="LogoBox">
      <img src={LogoImg} alt="Logo"></img>
    </div>
  );
}

export default LogoBox;
