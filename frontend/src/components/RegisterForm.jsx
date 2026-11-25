import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useFieldValidation } from "../hooks/useFieldValidation";
import { ENDPOINT } from "../config/constants";

const fields = [
  { name: "rut", label: "RUT", type: "text", requiredMessage: "Ingresa tu RUT." },
  { name: "nombre", label: "Nombres", type: "text", autoComplete: "given-name", requiredMessage: "Ingresa tus nombres." },
  { name: "apellido", label: "Apellidos", type: "text", autoComplete: "family-name", requiredMessage: "Ingresa tus apellidos." },
  { name: "correo", label: "Correo electrónico", type: "email", autoComplete: "username", requiredMessage: "Ingresa tu correo electrónico." },
  { name: "contrasena", label: "Contraseña", type: "password", autoComplete: "new-password", requiredMessage: "Ingresa tu contraseña." },
  { name: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel", requiredMessage: "Ingresa tu teléfono." },
];

const requiredMessages = Object.fromEntries(fields.map(({ name, requiredMessage }) => [name, requiredMessage]));

export const RegisterForm = () => {
  const { handleSession } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { fieldErrors, revalidateField, validateFields } = useFieldValidation(requiredMessages);
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    telefono: "",
    rol: "user",
  });

  const handleOnChange = (event) => {
    const input = event.currentTarget;
    const { name, value } = input;
    setFormData((previous) => ({ ...previous, [name]: value }));
    revalidateField(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!validateFields(event.currentTarget)) return;

    try {
      const { data } = await axios.post(ENDPOINT.register, formData);
      handleSession({ token: data.token, user: data.user });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="store-login-body">
      <Form className="store-login-form" noValidate onSubmit={handleSubmit}>
        {fields.map(({ name, label, type, autoComplete }) => {
          const id = `register-${name}`;
          const message = fieldErrors[name];

          return (
            <Form.Group controlId={id} key={name}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type={type}
                name={name}
                autoComplete={autoComplete}
                value={formData[name]}
                onChange={handleOnChange}
                isInvalid={Boolean(message)}
                aria-invalid={Boolean(message)}
                aria-describedby={message ? `${id}-error` : undefined}
                required
              />
              {message && (
                <Form.Control.Feedback type="invalid" id={`${id}-error`} role="alert">
                  {message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          );
        })}

        {error && <p className="store-login-error" role="alert">{error}</p>}
        <button className="store-button" type="submit">Crear cuenta</button>
      </Form>
      <p className="store-login-register">
        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};
