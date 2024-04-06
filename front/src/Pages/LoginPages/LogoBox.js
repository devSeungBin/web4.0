import React from "react";
import "./LogoBox.scss";

function LogoBox({ logo, handleLogoBox }) {
  // className - LogoBox
  const logoClass = `LogoBox ${logo ? "" : "loginOn"}`;
  // className - img
  const imgClass = `${logo ? "" : "loginOn"}`;
  return (
    <div className={logoClass}>
      <img
        src="/img/MH_Logo1.png"
        alt="Logo"
        onClick={handleLogoBox}
        className={imgClass}
      ></img>
    </div>
  );
}

export default LogoBox;
