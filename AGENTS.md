# PlantFiz — Instrucciones del repositorio

PlantFiz es una tienda de plantas con catálogo, fichas de producto, carrito,
cuentas de usuario y un panel de administración.

## Estructura

- `frontend/`: React, Vite, React Router y Bootstrap / React Bootstrap.
  Las rutas están en `frontend/src/router/RouterManager.jsx`, los endpoints
  en `frontend/src/config/constants.js` y los recursos públicos en
  `frontend/public/images/`.
- `backend/`: API de Express con PostgreSQL. Mantén separadas las rutas,
  los controladores y los modelos, siguiendo la estructura de `backend/src/`.
- El carrito vive en `frontend/src/context/CartContext.jsx` y se guarda en
  `localStorage`. Reutiliza ese contexto en lugar de duplicar su lógica.

## Reglas de trabajo

- Limita los cambios a lo solicitado. Si la tarea es visual, conserva las
  rutas, los contratos de API y el comportamiento del carrito. No cambies
  autenticación, datos ni administración como parte de un rediseño de la tienda.
- Reutiliza los componentes, estilos y dependencias existentes antes de
  añadir otros. Mantén los textos de la interfaz en español.
- En cambios de interfaz, revisa la vista móvil y de escritorio, el contraste
  y la navegación por teclado. No presentes filtros, favoritos o pago como
  funciones disponibles si no están conectadas.
- No incluyas credenciales ni valores de archivos `.env` en código,
  documentación, pruebas o respuestas.

## Comandos y verificación

Ejecuta los comandos desde la raíz del repositorio:

- Frontend en desarrollo: `npm --prefix frontend run dev`
- Backend en desarrollo: `npm --prefix backend run dev`
- Compilación del frontend: `npm --prefix frontend run build`
- Lint del frontend: `npm --prefix frontend run lint`
- Pruebas del backend: `npm --prefix backend test`

Para cambios en la tienda, verifica el recorrido catálogo → ficha → carrito.
Si el carrito se ve afectado, comprueba cantidades, eliminación, total y
persistencia al recargar. Indica qué verificaste y qué quedó sin comprobar.
