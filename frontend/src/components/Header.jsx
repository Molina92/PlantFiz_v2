import { IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="store-hero">
    <div className="store-hero-copy">
      <p className="store-kicker">Vivero boutique</p>
      <h1>Dale vida a tu <em>rincón favorito.</em></h1>
      <p className="store-intro">
        Encuentra una planta para ese espacio que quieres hacer más tuyo:
        del escritorio al jardín.
      </p>
      <Link className="store-button" to="/catalogo">
        Explorar plantas <IoArrowForwardOutline aria-hidden="true" />
      </Link>
    </div>
    <img
      className="store-hero-photo"
      src="/images/header_image.jpg"
      alt="Plantas de interior junto a una ventana"
      width="2000"
      height="1333"
      fetchPriority="high"
    />
  </header>
);

export default Header;
