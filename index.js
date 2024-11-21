const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const path = require('path');
const mysql = require('mysql2'); // Necesario para la conexión a la base de datos
require('dotenv').config(); // Para cargar las variables de entorno

// Crear una aplicación Express
const app = express();

// Crear un servidor HTTP con Express
const server = http.createServer(app);

// Crear un servidor WebSocket que escucha en el servidor HTTP
const wss = new WebSocketServer({ server });

// Configuración de la conexión a la base de datos usando mysql2
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Usamos el pool para hacer consultas
const db = pool.promise();

// Configurar WebSocket para manejar mensajes
wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');
  
  // Enviar un mensaje de bienvenida al cliente cuando se conecta
  ws.send('Bienvenido al servidor WebSocket!');
  
  // Manejar mensajes que recibimos del cliente
  ws.on('message', (message) => {
    console.log('Mensaje recibido del cliente:', message);
    // Responder al cliente con el mismo mensaje
    ws.send('Mensaje recibido: ' + message);
  });

  // Manejar cuando el cliente se desconecta
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// Ruta para obtener todos los eventos
app.get('/api/events', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM agenda_diaria');
    if (results.length === 0) {
      return res.status(404).json({ message: "No hay eventos en la agenda." });
    }
    res.json({ message: "Eventos obtenidos con éxito.", data: results });
  } catch (err) {
    return res.status(500).json({ message: "Hubo un error al obtener los eventos.", error: err.message });
  }
});

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Ruta al archivo HTML
});

// Iniciar el servidor HTTP en el puerto dinámico o 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor Express y WebSocket corriendo en http://localhost:${port}`);
});
