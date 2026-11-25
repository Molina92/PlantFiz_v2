import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFieldValidation } from "../hooks/useFieldValidation";
import { ENDPOINT } from "../config/constants";
import axios from "axios";

const requiredMessages = {
  correo: "Ingresa tu correo electrónico.",
  contrasena: "Ingresa tu contraseña.",
};

export const LoginForm = () => {
  const { handleSession } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { fieldErrors, revalidateField, validateFields } = useFieldValidation(requiredMessages);
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const handleOnChange = (e) => {
    const input = e.currentTarget;
    const { name, value } = input;
    setFormData((previous) => ({ ...previous, [name]: value }));
    revalidateField(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateFields(e.currentTarget)) return;

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
      <Form className="store-login-form" noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formCorreo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="correo"
            autoComplete="username"
            value={formData.correo}
            onChange={handleOnChange}
            isInvalid={Boolean(fieldErrors.correo)}
            aria-invalid={Boolean(fieldErrors.correo)}
            aria-describedby={fieldErrors.correo ? "formCorreoError" : undefined}
            required
          />
          {fieldErrors.correo && (
            <Form.Control.Feedback type="invalid" id="formCorreoError" role="alert">
              {fieldErrors.correo}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="formContrasena">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="contrasena"
            autoComplete="current-password"
            value={formData.contrasena}
            onChange={handleOnChange}
            isInvalid={Boolean(fieldErrors.contrasena)}
            aria-invalid={Boolean(fieldErrors.contrasena)}
            aria-describedby={fieldErrors.contrasena ? "formContrasenaError" : undefined}
            required
          />
          {fieldErrors.contrasena && (
            <Form.Control.Feedback type="invalid" id="formContrasenaError" role="alert">
              {fieldErrors.contrasena}
            </Form.Control.Feedback>
          )}
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
