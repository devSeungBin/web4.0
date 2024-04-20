import { Outlet } from "react-router-dom";
import NavThemeBar from "../../components/NavBar/NavThemeBar";
import MapLayout from "../ThemeLayouts/MapLayout"

function NavThemeLayout() {
  return (
    <>
      <NavThemeBar />
      <MapLayout>
        <Outlet />
      </MapLayout>
    </>
  );
}

export default NavThemeLayout;
