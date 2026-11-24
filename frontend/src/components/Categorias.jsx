const categorias = [
  { nombre: "Interior", imagen: "header_image.jpg", texto: "Verde para los espacios que más habitas." },
  { nombre: "Exterior", imagen: "exterior.jpg", texto: "Ideas para llenar de vida tu patio o balcón." },
  { nombre: "Suculentas", imagen: "suculentas.jpg", texto: "Pequeñas plantas con formas sorprendentes." },
];

const Categorias = () => (
  <section className="store-section" aria-labelledby="store-categories-title">
    <p className="store-kicker">Inspiración botánica</p>
    <h2 id="store-categories-title">Verde para cada espacio</h2>
    <div className="store-category-grid">
      {categorias.map(({ nombre, imagen, texto }) => (
        <article className="store-category" key={nombre}>
          <img src={`/images/${imagen}`} alt="" loading="lazy" />
          <h3>{nombre}</h3>
          <p>{texto}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Categorias;
