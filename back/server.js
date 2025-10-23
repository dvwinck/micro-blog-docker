import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { insertPost, listPosts } from "./db.js";

const app = express();

// se estiver atrás de proxy (nginx), para IP real via X-Forwarded-For
app.set("trust proxy", true);

// CORS: libera o front (ajuste ORIGIN em produção)
const ORIGIN = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: ORIGIN }));

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));

const getClientIp = (req) => {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) return fwd.split(",")[0].trim();
  return req.ip || req.socket.remoteAddress || "0.0.0.0";
};

app.get("/health_back", (_req, res) => res.status(200).send("OK"));

app.get("/api/posts", (_req, res) => {
  res.json(listPosts.all());
});

app.post("/api/posts", (req, res) => {
  const name = (req.body.name || "").trim();
  const message = (req.body.message || "").trim();
  const honeypot = (req.body.website || "").trim();
  if (honeypot) return res.status(400).send("bot?");
  if (!name || !message) return res.status(400).send("Nome e mensagem são obrigatórios.");
  if (name.length > 80 || message.length > 500) return res.status(400).send("Campos excederam tamanho permitido.");

  const ip = getClientIp(req);
  const payload = {
    name,
    ip: /^[0-9a-fA-F\.:]+$/.test(ip) ? ip : "0.0.0.0",
    message,
    created_at: new Date().toISOString()
  };
  insertPost.run(payload);
  return res.status(201).json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API rodando em http://0.0.0.0:${port}`));
