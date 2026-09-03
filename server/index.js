import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import fs from 'node:fs/promises';
import path from 'node:path';

const app = express();
const port = Number(process.env.API_PORT || 5174);
const email = (process.env.AUTH_EMAIL || 'rafa.2@gmail.com').trim().toLowerCase();
const passwordHash = process.env.AUTH_PASSWORD_HASH || '$2b$12$22VmW1AIaw/vKsoqCP1.Xex3Jid7FAlD36myT.BmpvPdt1S1Rwtne';
const secret = process.env.AUTH_SECRET || 'meta-strategy-bootstrap-2026-change-in-vercel';
const cookieOptions = { httpOnly: true, sameSite: 'lax', secure: false, path: '/' };
const usersFile = path.resolve('data/users.json');

async function readUsers() {
  try {
    return JSON.parse(await fs.readFile(usersFile, 'utf8'));
  } catch (error) {
    if (error?.code !== 'ENOENT') console.error('Falha ao ler usuários:', error);
    return [];
  }
}

async function writeUsers(users) {
  await fs.mkdir(path.dirname(usersFile), { recursive: true });
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

async function findUser(candidateEmail) {
  if (candidateEmail === email) return { id: 1, email, passwordHash };
  return (await readUsers()).find(user => user.email === candidateEmail) || null;
}

function setSession(res, userEmail, remember) {
  res.cookie('meta_session', jwt.sign({ sub: userEmail }, secret, { expiresIn: remember ? '30d' : '8h' }), { ...cookieOptions, maxAge: remember ? 2592000000 : undefined });
}

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 60 }));

app.post('/api/auth/login', async (req, res) => {
  const candidateEmail = String(req.body?.email || '').trim().toLowerCase();
  const account = await findUser(candidateEmail);
  const valid = account && await bcrypt.compare(String(req.body?.password || ''), account.passwordHash);
  if (!valid) return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
  const remember = Boolean(req.body?.remember);
  setSession(res, account.email, remember);
  res.json({ user: { id: account.id, email: account.email, phone: account.phone || null } });
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const payload = jwt.verify(req.cookies.meta_session || '', secret);
    const account = await findUser(String(payload.sub));
    if (!account) throw new Error('invalid');
    res.json({ user: { id: account.id, email: account.email, phone: account.phone || null } });
  } catch {
    res.status(401).json({ message: 'Sessão expirada. Entre novamente.' });
  }
});

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie('meta_session', cookieOptions);
  res.status(204).end();
});

app.post('/api/auth/register', async (req, res) => {
  const candidateEmail = String(req.body?.email || '').trim().toLowerCase();
  const candidatePassword = String(req.body?.password || '');
  const phone = String(req.body?.phone || '').trim();
  if (!/^\S+@\S+\.\S+$/.test(candidateEmail)) return res.status(400).json({ message: 'Informe um e-mail válido.' });
  if (candidatePassword.length < 8) return res.status(400).json({ message: 'A senha precisa ter pelo menos 8 caracteres.' });
  if (await findUser(candidateEmail)) return res.status(409).json({ message: 'Já existe uma conta com este e-mail.' });
  const users = await readUsers();
  const account = { id: Date.now(), email: candidateEmail, phone: phone || null, passwordHash: await bcrypt.hash(candidatePassword, 12) };
  users.push(account);
  await writeUsers(users);
  setSession(res, account.email, Boolean(req.body?.remember));
  res.status(201).json({ user: { id: account.id, email: account.email, phone: account.phone } });
});
app.post('/api/auth/forgot-password', (_req, res) => res.json({ message: 'Solicitação registrada. Entre em contato com a Meta Strategy para redefinir seu acesso.' }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.listen(port, () => console.info(`Meta Strategy API em http://localhost:${port}`));
