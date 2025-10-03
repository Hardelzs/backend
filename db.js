const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, 'data', 'database.sqlite');

const db = new Database(dbPath);

// Create tables if not exist
db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  faculty TEXT,
  course_name TEXT,
  course_code TEXT,
  lecturer_id INTEGER
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER,
  week TEXT,
  date TEXT,
  class_name TEXT,
  students_present INTEGER,
  total_students INTEGER,
  venue TEXT,
  time TEXT,
  topic TEXT,
  outcomes TEXT,
  recommendations TEXT,
  feedback TEXT
)`).run();

const bcrypt = require("bcryptjs");
const admin = db.prepare("SELECT * FROM users WHERE email=?").get("admin@example.com");
if (!admin) {
  const hashed = bcrypt.hashSync("password", 8);
  db.prepare("INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)")
    .run("Admin User", "admin@example.com", hashed, "lecturer");
  console.log("Default admin user created: admin@example.com / password");
}


module.exports = db;
