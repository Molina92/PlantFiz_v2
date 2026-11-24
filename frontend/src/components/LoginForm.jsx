import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ENDPOINT } from "../config/constants";
import axios from "axios";

export const LoginForm = () => {
  const { handleSession } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post(ENDPOINT.login, formData);

      handleSession({
        token: data.token,
        user: data.user
      }); 
      
      if (data.user.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }


    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
    }
  };

  return (
    <div className="store-login-body">
      <Form className="store-login-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formCorreo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="correo"
            autoComplete="username"
            value={formData.correo}
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formContrasena">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="contrasena"
            autoComplete="current-password"
            value={formData.contrasena}
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        {error && (
          <p className="store-login-error" role="alert">
            Credenciales incorrectas. Inténtalo de nuevo.
          </p>
        )}

        <button className="store-button" type="submit">Entrar</button>
      </Form>
      <p className="store-login-register">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};
