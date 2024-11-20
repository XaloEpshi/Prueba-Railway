const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

// Crear una aplicación Express
const app = express();
const server = http.createServer(app);

// Crear un servidor WebSocket que escuche en el servidor HTTP
const wss = new WebSocketServer({ server });

// Configurar WebSocket para manejar mensajes
wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');
  
  // Enviar un mensaje de bienvenida al cliente cuando se conecta
  ws.send('Bienvenido al servidor WebSocket!');
  
  ws.on('message', (message) => {
    console.log('Mensaje recibido del cliente:', message);
    // Enviar el mensaje de vuelta al cliente
    ws.send('Mensaje recibido: ' + message);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// Ruta HTTP simple para probar
app.get('/', (req, res) => {
  res.send('Servidor Express y WebSocket funcionando!');
});

// Iniciar el servidor HTTP en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor Express y WebSocket corriendo en http://localhost:3000');
});
