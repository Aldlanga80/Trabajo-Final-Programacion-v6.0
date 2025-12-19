Trabajo Final – Programación

API REST con MVC, autenticación, validación e implementación para renderizar en TypeScript

Este proyecto es la tarea final de nuestro curso de programación.

Implica el desarrollo completo de un backend profesional en Node.js y TypeScript, con arquitectura MVC, autenticación JWT, validación, filtrado de productos e implementación en Render.com.

El frontend consume la API y verifica su correcto funcionamiento.

*Tecnologías utilizadas*

   -Node.js

    -Express

    -TypeScript

    -MongoDB + Mongoose

    -JWT

   -Multer (uploads)

   -Morgan (logger)

   -Express-Rate-Limit

   -Dotenv

   -Render.com (deploy)

*CARACTERÌSTICAS PRINCIPALES DEL PROYECTO*
1. Arquitectura MVC

El backend se encuentra estructurado bajo el patrón Modelo – Vista – Controlador, con las siguientes carpetas:

src/
 ├── controllers/
 ├── services/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── validators/
 ├── utils/
 ├── config/


Esto permite mantener un código ordenado, escalable y fácil de mantener.

2. Scripts de ejecución (package.json)

El proyecto incluye los scripts obligatorios para desarrollo y producción:

"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}


dev: ejecuta el proyecto en TypeScript con hot-reload

build: compila TS → JS

start: ejecuta la versión compilada en producción

3. Logger con Morgan

Todas las solicitudes HTTP quedan registradas automáticamente indicando:

Método

Ruta

Status code

Tiempo de respuesta

Ejemplo de configuración:

import morgan from "morgan"
app.use(morgan("dev"))

4. Rate Limit (rutas de autenticación)

Las rutas /auth/login y /auth/register incluyen protección contra abuso:

import rateLimit from "express-rate-limit"

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Demasiados intentos, inténtelo nuevamente más tarde."
})


Esto evita ataques por fuerza bruta.

5. Autenticación y autorización

El proyecto implementa:

Registro de usuarios

Login con JWT

Middleware authMiddleware

Protege las rutas: POST, PATCH, DELETE de productos

productRouter.post("/", authMiddleware, upload.single("image"), ProductController.addProduct)


Solo usuarios autenticados pueden modificar datos.

6. Query Params (filtros de productos)

La API permite filtrar productos directamente desde la base de datos:

Filtros disponibles:

category

minPrice

maxPrice

name (búsqueda parcial)

Ejemplo:

GET /products?category=ropa&minPrice=1000&maxPrice=5000&name=cam


Toda la lógica se ejecuta en la consulta a MongoDB, no en código.

7. Validación de inputs

Se utiliza una capa completa de validaciones con librerías como Zod/Joi/Validator.

Ejemplos:

Validación al crear productos

Validación de actualización parcial

Manejo centralizado de errores

Respuestas consistentes

Si un input no cumple los requisitos, el servidor devuelve un error detallado.

8. Variables de entorno (.env)

El proyecto utiliza:

PORT=
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=


El archivo .env no se incluye en el repositorio siguiendo buenas prácticas.
Dotenv se configura al inicio del servidor.

9. Deploy en Render

El backend se encuentra desplegado correctamente en:

https://backend-final-93ds.onrender.com

El servidor se ejecuta sin errores y es consumido por el frontend.

Endpoints principales
Auth
Método	Ruta	Descripción
POST	/auth/register	Registrar usuario
POST	/auth/login	Iniciar sesión
Products
Método	Ruta	Protegida	Descripción
GET	/products	No	Obtener todos los productos (con filtros)
GET	/products/:id	No	Obtener producto por ID
POST	/products	Sí	Crear producto
PATCH	/products/:id	Sí	Actualizar producto
DELETE	/products/:id	Sí	Eliminar producto
Instalación y uso
1. Clonar repositorio
git clone https://github.com/Aldlanga80/Trabajo-Final-Programacion-v6.0.git
cd backend

2. Instalar dependencias
npm install

3. Crear archivo .env
PORT=3000
MONGO_URI=mongodb+srv://...
JWT_SECRET=...

4. Ejecutar en desarrollo
npm run dev

5. Compilar y ejecutar en producción
npm run build
npm start

Estado actual del proyecto

API completamente funcional

Autenticación con JWT

Validaciones implementadas

Rutas protegidas

Filtros por query params

Sistema de logs

Deploy en Render exitoso

Compatible con el frontend proporcionado

Autor

Aldo Langa
Proyecto final para la materia Programación – UTN