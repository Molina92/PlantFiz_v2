import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  IoArrowBackOutline, IoBagHandleOutline, IoHomeOutline,
  IoSunnyOutline, IoWaterOutline,
} from "react-icons/io5";
import axios from "axios";
import PlantImage from "../components/PlantImage";
import { CartContext } from "../context/CartContext";
import { ENDPOINT } from "../config/constants.js";
import { formatPrice } from "../utils/formatPrice";

const DetalleProducto = () => {
  const { id } = useParams();
  const { addCart, cart } = useContext(CartContext);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios.get(ENDPOINT.getPlantaPorId(id), { signal: controller.signal })
      .then(({ data }) => {
        if (!controller.signal.aborted) setResult({ id, planta: data.planta });
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setResult({ id, error: error.response?.status !== 404 });
        }
      });

    return () => controller.abort();
  }, [id]);

  const planta = result?.id === id ? result.planta : null;
  const inCart = planta ? (cart.find((item) => item.id === planta.id)?.count ?? 0) : 0;
  const cuidados = planta ? [
    { Icon: IoSunnyOutline, titulo: "Luz", valor: planta.luz },
    { Icon: IoWaterOutline, titulo: "Riego", valor: planta.agua },
    { Icon: IoHomeOutline, titulo: "Ideal para", valor: planta.ideal_para },
  ].filter(({ valor }) => valor) : [];

  return (
    <div className="store-page">
      <Link className="store-back-link" to="/catalogo">
        <IoArrowBackOutline aria-hidden="true" /> Volver al catálogo
      </Link>
      {result?.id !== id ? (
        <p className="store-state" role="status">Cargando planta…</p>
      ) : !planta ? (
        <div className="store-state">
          <h1>{result.error ? "No pudimos cargar esta planta" : "Planta no encontrada"}</h1>
        </div>
      ) : (
        <>
          <div className="store-detail-grid">
            <PlantImage src={planta.imagen_url} alt={planta.nombre_planta} loading="eager" />
            <div className="store-detail-copy">
              <p className="store-kicker">Ficha botánica</p>
              <h1>{planta.nombre_planta}</h1>
              {planta.origen && <p className="store-origin">Origen: {planta.origen}</p>}
              {planta.descripcion_hojas && <p>{planta.descripcion_hojas}</p>}
              <p className="store-detail-price">{formatPrice(planta.precio)}</p>
              <button
                type="button"
                className="store-button"
                onClick={() => addCart({ ...planta, count: 1 })}
              >
                <IoBagHandleOutline aria-hidden="true" /> Añadir al carrito
              </button>
              <p className="store-detail-feedback" role="status">
                {inCart > 0 && `${inCart} ${inCart === 1 ? "unidad" : "unidades"} en tu carrito.`}
              </p>
              {inCart > 0 && <Link className="store-back-link" to="/cart">Ver carrito</Link>}
            </div>
          </div>
          {cuidados.length > 0 && (
            <section className="store-section store-care" aria-labelledby="store-care-title">
              <p className="store-kicker">Guía de cuidados</p>
              <h2 id="store-care-title">Cómo cuidar tu planta</h2>
              <dl className="store-care-grid">
                {cuidados.map(({ Icon, titulo, valor }) => (
                  <div key={titulo}>
                    <dt><Icon aria-hidden="true" /> {titulo}</dt>
                    <dd>{valor}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default DetalleProducto;
