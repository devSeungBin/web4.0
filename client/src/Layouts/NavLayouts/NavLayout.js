import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import MainLayout from "../MainLayouts/MainLayout";

function NavLayout({ isLogin, handleIsLogin }) {
  return (
    <>
      <NavBar isLogin={isLogin} handleIsLogin={handleIsLogin}/>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
}

export default NavLayout;
