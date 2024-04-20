import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import MainLayout from "./MainLayouts/MainLayout";

function NavLayout() {
  return (
    <>
      <NavBar />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
}

export default NavLayout;
