import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardGaleria from "../components/ProductCardGaleria";
import { ENDPOINT } from "../config/constants.js";

const Catalogo = () => {
  const [plantas, setPlantas] = useState([]);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    axios.get(ENDPOINT.getPlantas, { signal: controller.signal })
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        setPlantas(Array.isArray(data.plantas) ? data.plantas : []);
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = () => {
    setStatus("loading");
    setAttempt((value) => value + 1);
  };

  return (
    <div className="store-page">
      <header className="store-page-heading">
        <p className="store-kicker">La colección</p>
        <h1>Catálogo de plantas</h1>
        <p className="store-intro">Encuentra el verde que mejor va con tu espacio.</p>
      </header>
      {status === "loading" && <p className="store-state" role="status">Cargando plantas…</p>}
      {status === "error" && (
        <div className="store-state">
          <p role="alert">No pudimos cargar el catálogo.</p>
          <button type="button" className="store-button store-button-outline" onClick={retry}>
            Volver a intentar
          </button>
        </div>
      )}
      {status === "ready" && (plantas.length > 0 ? (
        <>
          <p className="store-product-count" role="status">
            {plantas.length} {plantas.length === 1 ? "planta disponible" : "plantas disponibles"}
          </p>
          <ul className="store-product-grid">
            {plantas.map((planta) => <ProductCardGaleria key={planta.id} planta={planta} />)}
          </ul>
        </>
      ) : <p className="store-state" role="status">Por ahora no hay plantas en el catálogo.</p>)}
    </div>
  );
};

export default Catalogo;
