import { useEffect } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import CustomNav from "../components/Nav";
import Footer from "../components/Footer";
import "./Storefront.css";

export const MainLayout = () => {
  const { pathname } = useLocation();
  const profile = useMatch("/perfil/*");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={profile ? "store-layout" : "store-layout store-layout-public"}>
      <a className="store-skip" href="#contenido-principal">Saltar al contenido</a>
      <CustomNav />
      <main
        id="contenido-principal"
        className={profile ? "container" : "store-shell store-main"}
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
