# E-commerce: Mueblería Hermanos Jota

Proyecto grupal desarrollado para los Sprints 3 y 4 del curso Full Stack Developer de ITBA. Esta etapa integra una interfaz React con una API de productos construida con Node.js y Express.

## Descripción del Proyecto

El sitio representa a Mueblería Hermanos Jota, una empresa ficticia de muebles artesanales. Retoma el contenido, las imágenes y la identidad visual del trabajo anterior y reorganiza la interfaz en componentes reutilizables.

Los productos se obtienen mediante peticiones HTTP a un backend real. El servidor lee el catálogo desde un archivo JSON local y expone rutas para consultar el listado completo y el detalle de un producto.

El sitio permite:

- Explorar una página de inicio con hero, cuatro productos destacados, compromisos de la marca y testimonios ficticios.
- Consultar los 11 productos del catálogo, buscar por nombre y ordenar por precio ascendente o descendente.
- Ver la descripción, imagen, precio y especificaciones de cada producto.
- Agregar productos al carrito, acumular cantidades, quitar productos y consultar subtotales y total.
- Completar un formulario controlado con validaciones y mensajes accesibles.
- Navegar entre vistas mediante el menú principal y los enlaces del footer.

## Integrantes del Equipo

| Integrante | Responsabilidades en este sprint |
| --- | --- |
| Ayax Franklin Ibarra Ruveda | Integración de vistas en App, estado y lógica del carrito, contador y correcciones finales de integración. |
| Franco Gabriel Gil | Catálogo, tarjetas, detalle de producto y servicio compartido de consultas a la API. |
| Daiana Rosario Pereyra Stanicio | Formulario de contacto, validaciones, accesibilidad y revisión del frontend. |
| Franco Agustín Perez Lepera | Estructura inicial, API de productos, middlewares y configuración del backend. |
| Micaela Abril Pérez | Home, Navbar, Footer, estilos globales e identidad visual. |

El equipo trabajó con ramas y pull requests para incorporar las distintas funcionalidades.

## Tecnologías Utilizadas

- React y JSX: componentes, props, eventos, estado y efectos.
- Vite: servidor de desarrollo y compilación del frontend.
- JavaScript: consultas con fetch y async/await; operaciones sobre arrays.
- HTML semántico y CSS: diseño adaptable, estilos globales y CSS Modules para contacto.
- Node.js y Express: servidor HTTP, Router y middlewares.
- JSON: almacenamiento local del catálogo.
- Git y GitHub: control de versiones y colaboración.
- Oxlint y node:test: análisis estático y pruebas de lógica del carrito.

## Recorrido por el Sitio

| Vista o componente | Archivo | Funcionalidad |
| --- | --- | --- |
| Inicio | `frontend/src/components/Home.jsx` | Hero, destacados obtenidos de la API y secciones de marca. |
| Catálogo | `frontend/src/components/ProductList.jsx` | Listado, búsqueda, ordenamiento, carga, errores y reintento. |
| Tarjeta | `frontend/src/components/ProductCard.jsx` | Presentación reutilizable de cada producto y botones de detalle y carrito. |
| Detalle | `frontend/src/components/ProductDetail.jsx` | Consulta por ID y presentación de especificaciones. |
| Carrito | `frontend/src/components/Cart.jsx` | Cantidades, subtotales, total y eliminación de una línea completa. |
| Contacto | `frontend/src/components/ContactForm.jsx` | Campos controlados y validación de nombre, correo, asunto y mensaje. |
| Navegación | `frontend/src/components/Navbar.jsx` | Cambio de vista y contador de unidades. |
| Pie de página | `frontend/src/components/Footer.jsx` | Datos de contacto, navegación y botón para volver arriba. |

## Por Dentro: Cómo se Mueven los Datos

**La API concentra el catálogo.** Los datos están en `backend/db/products.json`. Cada producto contiene `id`, `name`, `desc`, `price`, `img` y `specs`. Las imágenes se encuentran en `frontend/public/img`; la API devuelve sus rutas. El ID `0` es válido.

**Las consultas del frontend se comparten.** `frontend/src/services/productService.js` contiene `getProducts()` y `getProductById(id)`. Home, catálogo y detalle utilizan este servicio para consultar el servidor. Las vistas muestran estados de carga y error; catálogo y detalle ofrecen reintentar cuando corresponde.

**App coordina las vistas.** `App.jsx` conserva la vista activa y el ID seleccionado. La navegación utiliza renderizado condicional, sin React Router. Por eso no hay una URL independiente por producto ni historial de vistas gestionado por un router.

**El carrito vive en el estado de App.** Los componentes reciben funciones por props para agregar y quitar productos. `utils/carrito.js` realiza las operaciones sin modificar el estado anterior. El contador suma unidades y el total suma precio por cantidad; ambos se calculan a partir del carrito. Cambiar de vista conserva los productos, pero recargar la página vacía el carrito: no se utiliza localStorage.

**El formulario valida en el navegador.** Los campos se controlan con estado de React. Los errores se vinculan mediante atributos de accesibilidad y el foco se dirige al primer campo inválido. La confirmación indica que los datos fueron validados; no existe envío de correo ni almacenamiento de consultas.

**Los estilos y componentes se reutilizan.** `index.css` contiene la identidad visual y los estilos globales; `App.css` agrega ajustes de integración y carrito. Las tarjetas renderizan los textos mediante JSX y usan elementos `article`. El footer utiliza `address` para el domicilio.

## Estructura del Proyecto

| Ruta | Contenido |
| --- | --- |
| `backend/index.js` | Inicio del servidor y registro de middlewares y rutas. |
| `backend/routes/products.js` | Router de listado y detalle; lectura del archivo de productos. |
| `backend/middlewares/` | Logger, respuesta de ruta inexistente y manejador central de errores. |
| `backend/db/products.json` | Catálogo local. |
| `frontend/src/App.jsx` | Integración y estado compartido. |
| `frontend/src/components/` | Componentes de la interfaz. |
| `frontend/src/services/` | Consultas a la API. |
| `frontend/src/utils/` | Funciones del carrito y formato de precios. |
| `frontend/public/img/` | Imágenes de productos y logo. |
| `frontend/tests/` | Pruebas de la lógica del carrito. |
| `frontend/vite.config.js` | Configuración de Vite y proxy de desarrollo. |

## Cómo Clonar y Ejecutar el Proyecto

### 1. Requisitos

- Node.js 22.12 o superior dentro de la rama 22, o una versión posterior compatible (por ejemplo, Node.js 24).
- npm y Git.
- Dos terminales: una para el backend y otra para el frontend.

### 2. Clonar el repositorio

```bash
git clone https://github.com/Francope162/Sprint-3-y-4.git
cd Sprint-3-y-4
```

### 3. Iniciar el backend

Desde la raíz del proyecto:

```bash
cd backend
npm ci
npm run dev
```

El servidor usa el puerto `3000` por defecto. Opcionalmente, se configura en `backend/.env`:

```env
PORT=3000
```

Comprobar el listado abriendo `http://localhost:3000/api/products`.

### 4. Iniciar el frontend

En otra terminal, desde la raíz del proyecto:

```bash
cd frontend
npm ci
npm run dev
```

Abrir la dirección que indique Vite, normalmente `http://localhost:5173`. Ambos servidores deben permanecer encendidos.

El proxy de Vite redirige las solicitudes `/api` al backend. Su destino predeterminado es `http://localhost:3000`; puede configurarse en `frontend/.env`:

```env
API_URL=http://localhost:3000
```

Si se cambia el puerto del backend, actualizar ese valor y reiniciar Vite. `API_URL` se lee en la configuración de Vite. El servicio del frontend también admite `VITE_API_URL` para consultar un origen explícito; para el desarrollo con proxy no es necesario definirla.

**No se ejecuta con Live Server ni abriendo index.html directamente:** esta versión necesita Vite y el servidor Express.

### Problema frecuente: ECONNREFUSED

Si Vite muestra un error de proxy para `/api/products`, comprobar que el backend esté iniciado y que su puerto coincida con `API_URL`. Después, recargar la vista o pulsar Reintentar.

## Rutas de la API

| Método | Ruta | Respuesta esperada |
| --- | --- | --- |
| GET | `/api/products` | `200`: array con el catálogo. |
| GET | `/api/products/:id` | `200`: producto correspondiente al ID. |
| GET | `/api/products/999` | `404`: producto inexistente. |
| GET | `/api/products/abc` | `400`: ID no numérico. |
| GET | Una ruta no definida | `404`: respuesta del middleware de rutas inexistentes. |

El logger registra método, URL y estado de respuesta. Los errores derivados con `next(error)` llegan al manejador central. Las rutas documentadas corresponden a esta implementación y usan `products` en inglés.

## Comprobaciones

Desde `frontend`:

```bash
node --test tests/carrito.test.js
npm run lint
npm run build
```

- Las pruebas cubren acumulación de cantidades, ID 0, inmutabilidad, conteo, total y eliminación.
- `lint` analiza el código. En la versión revisada reporta dos advertencias `set-state-in-effect` en catálogo y detalle, sin errores.
- `build` genera el frontend en `frontend/dist`.
- El backend todavía no tiene una suite automatizada configurada: su script `npm test` es el marcador inicial.

Recorrido manual sugerido:

1. Abrir Inicio y Catálogo y comprobar que se muestran productos e imágenes.
2. Agregar dos Aparadores Uspallata y una Biblioteca Recoleta: contador de 3 unidades y total de 7000.
3. Abrir el detalle del Aparador y agregar otra unidad: contador de 4 y total de 9000.
4. Ir a Contacto y volver al carrito: los productos deben permanecer.
5. Quitar todas las líneas y comprobar el estado vacío.
6. Probar validaciones del formulario y navegación desde el footer.
7. Revisar las vistas con teclado y en pantalla angosta.

## Alcance y Decisiones

- Se mantienen Vite, la carpeta `frontend` y las rutas `/api/products` de la base del equipo.
- El backend lee un JSON local; no se utiliza una base de datos ni hay operaciones para crear, editar o eliminar productos.
- El carrito se mantiene únicamente en memoria durante la navegación.
- Los precios son ilustrativos. El carrito los presenta en ARS; no hay pagos ni pedidos reales.
- El formulario no envía mensajes.
- El proxy configurado es para desarrollo. Compilar el frontend no despliega el backend; una publicación requiere configurar ambos servicios y su conexión.

## Enlaces

- **Link del repositorio:** https://github.com/Francope162/Sprint-3-y-4