const mysql = require('mysql2');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

// Configuración de la conexión con la base de datos usando las variables de entorno
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,  // Usamos la variable de entorno MYSQLHOST
  user: process.env.MYSQLUSER,  // Usamos la variable de entorno MYSQLUSER
  password: process.env.MYSQLPASSWORD,  // Usamos la variable de entorno MYSQLPASSWORD
  database: process.env.MYSQLDATABASE,  // Usamos la variable de entorno MYSQLDATABASE
  port: process.env.MYSQLPORT,  // Usamos la variable de entorno MYSQLPORT
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos el pool para que se pueda usar en otros archivos
module.exports = pool.promise();
