import { PiPottedPlant } from "react-icons/pi";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => (
  <section className="store-login" aria-labelledby="store-register-title">
    <header className="store-login-heading">
      <span className="store-login-icon"><PiPottedPlant aria-hidden="true" /></span>
      <p className="store-kicker">Crear cuenta</p>
      <p className="store-login-intro">Completa tus datos para registrarte.</p>
    </header>
    <RegisterForm />
  </section>
);

