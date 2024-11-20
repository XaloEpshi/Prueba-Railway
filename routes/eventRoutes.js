const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Obtener todos los eventos
router.get('/events', async (req, res) => {
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

module.exports = router;
