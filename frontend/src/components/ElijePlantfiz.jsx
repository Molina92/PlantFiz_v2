import { IoHomeOutline, IoSunnyOutline } from "react-icons/io5";
import { PiPottedPlant } from "react-icons/pi";

const servicios = [
  { Icon: PiPottedPlant, titulo: "Variedad de plantas", texto: "Desde suculentas para una repisa hasta plantas para el jardín." },
  { Icon: IoHomeOutline, titulo: "Para tu espacio", texto: "Encuentra opciones para distintos rincones, dentro y fuera de casa." },
  { Icon: IoSunnyOutline, titulo: "Cuidados a la vista", texto: "Consulta la luz y el riego que necesita cada planta antes de elegir." },
];

const ElijePlantfiz = () => (
  <section className="store-section store-benefits" aria-labelledby="store-benefits-title">
    <p className="store-kicker">La tienda</p>
    <h2 id="store-benefits-title">¿Por qué PlantFiz?</h2>
    <div className="store-benefits-grid">
      {servicios.map(({ Icon, titulo, texto }) => (
        <div key={titulo}>
          <Icon aria-hidden="true" />
          <h3>{titulo}</h3>
          <p>{texto}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ElijePlantfiz;
