// controllers/authController.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const setCookie = (res, token) => {
  const cookieName = process.env.COOKIE_NAME || 'admin_token';
  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // true behind HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Admin exists' });
    const admin = await Admin.create({ email, password, name });
    return res.status(201).json({ id: admin._id, email: admin.email });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await admin.comparePassword(password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES || '7d',
    });

    setCookie(res, token);
    res.json({ id: admin._id, email: admin.email, name: admin.name, role: admin.role });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const me = async (req, res) => {
  res.json({ ok: true, admin: { id: req.admin._id, email: req.admin.email, role: req.admin.role } });
};

export const logout = async (req, res) => {
  const cookieName = process.env.COOKIE_NAME || 'admin_token';
  res.clearCookie(cookieName, { path: '/' });
  res.json({ ok: true });
};
