const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'data', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database open error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Create tables if not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    faculty TEXT,
    course_name TEXT,
    course_code TEXT,
    lecturer_id INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reports (
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
  )`);

  // Create default admin user
  db.get('SELECT * FROM users WHERE email=?', ['admin@example.com'], (err, row) => {
    if (!err && !row) {
      const hashed = bcrypt.hashSync('password', 8);
      db.run(
        'INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)',
        ['Admin User', 'admin@example.com', hashed, 'lecturer'],
        (err) => {
          if (!err) {
            console.log('Default admin user created: admin@example.com / password');
          }
        }
      );
    }
  });
});

// Promisify database methods for easier use
const dbAsync = {
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ lastInsertRowid: this.lastID, changes: this.changes });
      });
    });
  },
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }
};

// Synchronous wrapper for backward compatibility
const dbSync = {
  prepare: (sql) => {
    return {
      run: (...params) => {
        let result = { lastInsertRowid: null };
        db.run(sql, params, function(err) {
          if (err) throw err;
          result.lastInsertRowid = this.lastID;
        });
        return result;
      },
      get: (...params) => {
        let result = null;
        db.prepare(sql).get(...params, (err, row) => {
          if (err) throw err;
          result = row;
        });
        return result;
      }
    };
  }
};

module.exports = { db, dbAsync, dbSync };
