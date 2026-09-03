import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const DEFAULT_EMAIL = 'rafa.2@gmail.com';
const DEFAULT_PASSWORD_HASH = '$2b$12$22VmW1AIaw/vKsoqCP1.Xex3Jid7FAlD36myT.BmpvPdt1S1Rwtne';
const COOKIE = 'meta_session';

function config() {
  return {
    email: (process.env.AUTH_EMAIL || DEFAULT_EMAIL).trim().toLowerCase(),
    passwordHash: process.env.AUTH_PASSWORD_HASH || DEFAULT_PASSWORD_HASH,
    secret: process.env.AUTH_SECRET || 'meta-strategy-bootstrap-2026-change-in-vercel',
  };
}

function cookies(header = '') {
  return Object.fromEntries(header.split(';').map(item => item.trim().split('=').map(decodeURIComponent)).filter(pair => pair.length === 2));
}

function setSession(res, email, remember) {
  const { secret } = config();
  const token = jwt.sign({ sub: email }, secret, { expiresIn: remember ? '30d' : '8h' });
  const maxAge = remember ? '; Max-Age=2592000' : '';
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax${secure}${maxAge}`);
}

function clearSession(res) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax${secure}; Max-Age=0`);
}

function currentUser(req) {
  const token = cookies(req.headers.cookie)[COOKIE];
  if (!token) return null;
  try {
    const payload = jwt.verify(token, config().secret);
    return payload.sub === config().email ? { id: 1, email: payload.sub } : null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const action = String(req.query.action || '');
  res.setHeader('Cache-Control', 'no-store');

  if (action === 'login' && req.method === 'POST') {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    const credentials = config();
    const valid = email === credentials.email && await bcrypt.compare(password, credentials.passwordHash);
    if (!valid) return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    setSession(res, credentials.email, Boolean(req.body?.remember));
    return res.status(200).json({ user: { id: 1, email: credentials.email } });
  }

  if (action === 'me' && req.method === 'GET') {
    const user = currentUser(req);
    return user ? res.status(200).json({ user }) : res.status(401).json({ message: 'Sessão expirada. Entre novamente.' });
  }

  if (action === 'logout' && req.method === 'POST') {
    clearSession(res);
    return res.status(204).end();
  }

  if (action === 'register' && req.method === 'POST') {
    return res.status(403).json({ message: 'O acesso é privado. Novas contas são criadas pela Meta Strategy.' });
  }

  if (action === 'forgot-password' && req.method === 'POST') {
    return res.status(200).json({ message: 'Solicitação registrada. Entre em contato com a Meta Strategy para redefinir seu acesso.' });
  }

  return res.status(404).json({ message: 'Endpoint não encontrado.' });
}
