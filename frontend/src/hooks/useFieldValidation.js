import { useState } from "react";

const getFieldError = (input, requiredMessage) => {
  if (input.validity.valueMissing) return requiredMessage;
  if (input.validity.typeMismatch) return "Ingresa un correo electrónico válido.";
  return "";
};

export const useFieldValidation = (requiredMessages) => {
  const [fieldErrors, setFieldErrors] = useState({});

  const revalidateField = (input) => {
    const { name } = input;
    if (fieldErrors[name]) {
      const message = getFieldError(input, requiredMessages[name]);
      setFieldErrors((previous) => ({ ...previous, [name]: message }));
    }
  };

  const validateFields = (form) => {
    const errors = {};
    let firstInvalid;

    for (const [name, message] of Object.entries(requiredMessages)) {
      const input = form.elements.namedItem(name);
      const fieldError = getFieldError(input, message);
      if (fieldError) {
        errors[name] = fieldError;
        firstInvalid ??= input;
      }
    }

    setFieldErrors(errors);
    firstInvalid?.focus();
    return !firstInvalid;
  };

  return { fieldErrors, revalidateField, validateFields };
};
