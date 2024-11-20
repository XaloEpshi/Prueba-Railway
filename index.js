const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const path = require('path'); // Necesario para usar sendFile

// Crear una aplicación Express
const app = express();

// Crear un servidor HTTP con Express
const server = http.createServer(app);

// Crear un servidor WebSocket que escucha en el servidor HTTP
const wss = new WebSocketServer({ server });

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

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Ruta al archivo HTML
});

// Iniciar el servidor HTTP en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor Express y WebSocket corriendo en http://localhost:3000');
});


