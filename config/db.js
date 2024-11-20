const mysql = require('mysql2');

// Crear una conexión a la base de datos usando las variables de entorno
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,  // Utiliza la variable de entorno de Railway
  user: process.env.MYSQLUSER,  // Usuario de la base de datos
  password: process.env.MYSQLPASSWORD,  // Contraseña de la base de datos
  database: process.env.MYSQLDATABASE,  // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportar la conexión para poder usarla en otras partes de la aplicación
module.exports = pool.promise();
