import { Outlet } from "react-router-dom";
import Header from "../../components/MainHeader/Header";


function NavLayout2() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default NavLayout2;
