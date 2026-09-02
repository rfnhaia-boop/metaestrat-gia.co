import express from 'express';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.API_PORT || 5174);
const isProduction = process.env.NODE_ENV === 'production';
const jwtSecret = process.env.JWT_SECRET || 'development-only-change-me';
const appUrl = process.env.APP_URL || 'http://localhost:5173';

if (isProduction && jwtSecret === 'development-only-change-me') throw new Error('Configure JWT_SECRET em produção.');

const db = new Database(path.join(__dirname, 'metastrategy.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS password_resets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    used_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: appUrl, credentials: true }));
app.use(express.json({ limit: '32kb' }));
app.use(cookieParser());
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 60, standardHeaders: 'draft-8', legacyHeaders: false }));

const credentialsSchema = z.object({
  email: z.string().trim().email('Informe um e-mail válido.').transform(v => v.toLowerCase()),
  password: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres.'),
});

function setSession(res, userId, remember = false) {
  const token = jwt.sign({ sub: String(userId) }, jwtSecret, { expiresIn: remember ? '30d' : '8h' });
  res.cookie('meta_session', token, {
    httpOnly: true, secure: isProduction, sameSite: 'lax', path: '/',
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : undefined,
  });
}

function requireAuth(req, res, next) {
  try {
    const payload = jwt.verify(req.cookies.meta_session || '', jwtSecret);
    req.userId = Number(payload.sub);
    next();
  } catch {
    res.status(401).json({ message: 'Sessão expirada. Entre novamente.' });
  }
}

app.post('/api/auth/register', async (req, res) => {
  const parsed = credentialsSchema.extend({ phone: z.string().trim().max(30).optional() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });
  const { email, password, phone } = parsed.data;
  if (db.prepare('SELECT 1 FROM users WHERE email = ?').get(email)) return res.status(409).json({ message: 'Já existe uma conta com este e-mail.' });
  const passwordHash = await bcrypt.hash(password, 12);
  const result = db.prepare('INSERT INTO users (email, phone, password_hash) VALUES (?, ?, ?)').run(email, phone || null, passwordHash);
  setSession(res, result.lastInsertRowid, true);
  res.status(201).json({ user: { id: Number(result.lastInsertRowid), email } });
});

app.post('/api/auth/login', async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Confira seu e-mail e sua senha.' });
  const user = db.prepare('SELECT id, email, password_hash FROM users WHERE email = ?').get(parsed.data.email);
  if (!user || !(await bcrypt.compare(parsed.data.password, user.password_hash))) return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
  setSession(res, user.id, Boolean(req.body.remember));
  res.json({ user: { id: user.id, email: user.email } });
});

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie('meta_session', { path: '/' });
  res.status(204).end();
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id, email, phone, created_at AS createdAt FROM users WHERE id = ?').get(req.userId);
  if (!user) return res.status(401).json({ message: 'Conta não encontrada.' });
  res.json({ user });
});

app.post('/api/auth/forgot-password', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (user) {
    db.prepare('DELETE FROM password_resets WHERE user_id = ? OR expires_at < ?').run(user.id, new Date().toISOString());
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    db.prepare('INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, ?)').run(user.id, tokenHash, new Date(Date.now() + 30 * 60 * 1000).toISOString());
    const resetUrl = `${appUrl}/login?reset=${token}`;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transport.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: email,
        subject: 'Recuperação de acesso - Meta Strategy',
        text: `Use este link em até 30 minutos para definir uma nova senha: ${resetUrl}`,
        html: `<p>Use o link abaixo em até 30 minutos para definir uma nova senha:</p><p><a href="${resetUrl}">Redefinir minha senha</a></p>`,
      });
    } else if (!isProduction) console.info(`Recuperação: ${resetUrl}`);
  }
  res.json({ message: 'Se a conta existir, as instruções de recuperação serão enviadas.' });
});

app.post('/api/auth/reset-password', async (req, res) => {
  const parsed = z.object({ token: z.string().min(20), password: z.string().min(8) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Link ou nova senha inválidos.' });
  const tokenHash = crypto.createHash('sha256').update(parsed.data.token).digest('hex');
  const reset = db.prepare('SELECT id, user_id FROM password_resets WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?').get(tokenHash, new Date().toISOString());
  if (!reset) return res.status(400).json({ message: 'Este link expirou ou já foi utilizado.' });
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  db.transaction(() => {
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, reset.user_id);
    db.prepare('UPDATE password_resets SET used_at = ? WHERE id = ?').run(new Date().toISOString(), reset.id);
  })();
  setSession(res, reset.user_id, false);
  res.json({ message: 'Senha atualizada com sucesso.' });
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

if (isProduction) {
  const dist = path.resolve(__dirname, '../dist');
  app.use(express.static(dist));
  app.use((_req, res) => res.sendFile(path.join(dist, 'index.html')));
}
app.listen(port, () => console.info(`Meta Strategy API em http://localhost:${port}`));
