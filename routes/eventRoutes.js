const express = require('express');
const pool = require('./config/db');
const app = express();

// Ruta para obtener todos los eventos
app.get('/api/events', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM agenda_diaria');
    if (results.length === 0) {
      return res.status(404).json({ message: "No hay eventos en la agenda." });
    }
    res.json({ message: "Eventos obtenidos con éxito.", data: results });
  } catch (err) {
    return res.status(500).json({ message: "Hubo un error al obtener los eventos.", error: err.message });
  }
});

// Iniciar el servidor en Railway (puerto dinámico)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
