const express = require('express');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');

// Inicializar dotenv para manejar las variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Usar las rutas para los eventos
app.use('/api', eventRoutes);

// Configurar el puerto
const port = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
