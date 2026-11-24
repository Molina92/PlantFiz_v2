import { PiPottedPlant } from "react-icons/pi";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => (
  <section className="store-login" aria-labelledby="store-login-title">
    <header className="store-login-heading">
      <span className="store-login-icon"><PiPottedPlant aria-hidden="true" /></span>
      <p className="store-kicker">Iniciar sesión</p>
      <h1 id="store-login-title"></h1>
      <p className="store-login-intro">Ingresa con tu correo y contraseña.</p>
    </header>
    <LoginForm />
  </section>
);
