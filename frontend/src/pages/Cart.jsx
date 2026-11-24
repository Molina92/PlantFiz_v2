import { useContext } from "react";
import { IoArrowBackOutline, IoBagHandleOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PlantImage from "../components/PlantImage";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

const Cart = () => {
  const { cart, addCart, removeFromCart, deletePlanta, total } = useContext(CartContext);
  const itemCount = cart.reduce((count, item) => count + item.count, 0);

  return (
    <div className="store-page">
      <header className="store-page-heading">
        <p className="store-kicker">Tu selección</p>
        <h1>Tu carrito</h1>
        {itemCount > 0 && (
          <p className="store-intro">
            {itemCount} {itemCount === 1 ? "planta en tu carrito" : "plantas en tu carrito"}
          </p>
        )}
      </header>
      {cart.length === 0 ? (
        <div className="store-state store-cart-empty">
          <IoBagHandleOutline aria-hidden="true" />
          <h2>Tu carrito está vacío</h2>
          <p>Explora el catálogo y elige una planta para tu espacio.</p>
          <Link className="store-button" to="/catalogo">Volver al catálogo</Link>
        </div>
      ) : (
        <div className="store-cart-grid">
          <section aria-label="Productos en el carrito">
            <ul className="store-cart-list">
              {cart.map((item) => (
                <li className="store-cart-item" key={item.id}>
                  <PlantImage src={item.imagen_url} alt="" />
                  <div className="store-cart-item-info">
                    <Link to={`/DetalleProducto/${item.id}`}>{item.nombre_planta}</Link>
                    <p>{formatPrice(item.precio)} por unidad</p>
                    <button
                      type="button"
                      className="store-remove"
                      aria-label={`Quitar ${item.nombre_planta} del carrito`}
                      onClick={() => deletePlanta(item.id)}
                    >
                      <IoTrashOutline aria-hidden="true" /> Quitar
                    </button>
                  </div>
                  <div className="store-stepper" role="group" aria-label={`Cantidad de ${item.nombre_planta}`}>
                    <button
                      type="button"
                      aria-label={`Reducir cantidad de ${item.nombre_planta}`}
                      onClick={() => removeFromCart(item.id)}
                    >−</button>
                    <span aria-live="polite">{item.count}</span>
                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${item.nombre_planta}`}
                      onClick={() => addCart({ ...item, count: 1 })}
                    >+</button>
                  </div>
                  <p className="store-cart-subtotal">{formatPrice(item.precio * item.count)}</p>
                </li>
              ))}
            </ul>
            <Link className="store-back-link" to="/catalogo">
              <IoArrowBackOutline aria-hidden="true" /> Seguir explorando
            </Link>
          </section>
          <aside className="store-order" aria-labelledby="store-order-title">
            <h2 id="store-order-title">Resumen del carrito</h2>
            <p className="store-order-total" aria-live="polite">
              <span>Total</span> <strong>{formatPrice(total)}</strong>
            </p>
            <p className="store-order-note">El pago en línea aún no está disponible.</p>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
