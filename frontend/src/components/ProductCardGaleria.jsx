import { IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PlantImage from "./PlantImage";
import { formatPrice } from "../utils/formatPrice";

// eslint-disable-next-line react/prop-types -- The card displays a plant record from the catalog API.
const ProductCardGaleria = ({ planta: { id, imagen_url, nombre_planta, precio } }) => (
  <li>
    <Link className="store-product-card" to={`/DetalleProducto/${id}`}>
      <PlantImage src={imagen_url} alt="" />
      <div className="store-product-card-body">
        <div>
          <h2>{nombre_planta}</h2>
          <p>{formatPrice(precio)}</p>
        </div>
        <IoArrowForwardOutline aria-hidden="true" />
      </div>
    </Link>
  </li>
);

export default ProductCardGaleria;
