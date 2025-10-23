import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import { dirname } from "path";

const dbPath = process.env.DB_PATH || "./microblog.db";
mkdirSync(dirname(dbPath), { recursive: true }); // cria /data ou ./ se precisar


const db = new Database(process.env.DB_PATH || "./microblog.db");
db.pragma("journal_mode = WAL");
db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ip TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`).run();

export const insertPost = db.prepare(`
  INSERT INTO posts (name, ip, message, created_at)
  VALUES (@name, @ip, @message, @created_at)
`);

export const listPosts = db.prepare(`
  SELECT id, name, ip, message, created_at
  FROM posts
  ORDER BY datetime(created_at) DESC
  LIMIT 100
`);
