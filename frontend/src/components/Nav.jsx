import { useContext } from "react";
import { IoBagHandleOutline, IoPersonOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";

const CustomNav = () => {
  const { session, handleLogout } = useAuth();
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const itemCount = cart.reduce((count, item) => count + item.count, 0);
  const accountPath = session
    ? session.user?.rol === "admin" ? "/admin/" : "/perfil"
    : "/login";

  const logout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="store-nav">
      <div className="store-shell store-nav-inner">
        <Link className="store-brand" to="/" aria-label="PlantFiz, inicio">
          <img src="/images/logo_plantfiz.png" alt="" width="38" height="38" />
          <span>PlantFiz</span>
        </Link>
        <nav className="store-nav-links" aria-label="Navegación principal">
          <NavLink className="store-nav-home" to="/" end>Inicio</NavLink>
          <NavLink to="/catalogo">Catálogo</NavLink>
        </nav>
        <div className="store-nav-actions">
          <Link
            className="store-nav-icon"
            to={accountPath}
            aria-label={session ? "Mi cuenta" : "Iniciar sesión"}
          >
            <IoPersonOutline aria-hidden="true" />
            <span className="store-nav-label">{session ? "Mi cuenta" : "Iniciar sesión"}</span>
          </Link>
          {session && (
            <button type="button" className="store-logout" onClick={logout}>
              Cerrar sesión
            </button>
          )}
          <NavLink
            className="store-nav-icon store-nav-cart"
            to="/cart"
            aria-label={`Carrito: ${itemCount} ${itemCount === 1 ? "planta" : "plantas"}`}
          >
            <IoBagHandleOutline aria-hidden="true" />
            <span className="store-nav-label">Carrito</span>
            <span className="store-cart-count" aria-hidden="true">{itemCount}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CustomNav;
