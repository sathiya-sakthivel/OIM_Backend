// server.js

const express = require("express");
const mysql = require("mysql2");

// ✅ Replace these with your Railway MySQL details:
const DB_HOST = "gondola.proxy.rlwy.net";
const DB_USER = "root";
const DB_PASSWORD = "AYWPBpXucsMCIBlXntTuMFfmbmdSPwBv";
const DB_NAME = "railway";
const DB_PORT = 50765; // Railway usually uses 3306 for MySQL

const app = express();
const PORT = 5000;

// Create MySQL connection pool
const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

// Test the DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
    return;
  }
  console.log("✅ Connected to MySQL database!");
  connection.release();
});

// Example API route
app.get("/api/ping", (req, res) => {
  db.query("SELECT NOW() AS currentTime", (err, results) => {
    if (err) {
      console.error("❌ Query error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json({
      message: "Database is connected",
      serverTime: results[0].currentTime,
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
