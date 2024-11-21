const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const path = require('path'); // Necesario para usar sendFile

// Declara el puerto usando la variable de entorno o 3000 como valor por defecto
const port = process.env.PORT || 3000;

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

// Ruta para obtener todos los eventos
app.get('/events', async (req, res) => {
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

// Iniciar el servidor HTTP en el puerto dinámico
server.listen(port, () => {
  console.log(`Servidor Express y WebSocket corriendo en http://localhost:${port}`);
});
