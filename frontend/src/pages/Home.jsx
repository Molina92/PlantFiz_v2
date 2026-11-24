import Header from "../components/Header";
import Categorias from "../components/Categorias";
import ElijePlantfiz from "../components/ElijePlantfiz";

export const Home = () => {
  return (
    <div className="store-home">
      <Header />
      <Categorias />
      <ElijePlantfiz />
    </div>
  );
};
