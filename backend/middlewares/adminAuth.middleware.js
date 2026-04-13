import jwt from 'jsonwebtoken';
import debug from 'debug';
import Admin from '../models/Admin.js'; // fix path/name

const debugging = debug('development:middleware:adminAuth');

const adminAuth = async (req, res, next) => {
  try {
    const cookieName = process.env.COOKIE_NAME || 'admin_token';
    const token = req.cookies?.[cookieName];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token missing. Please login again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin || (admin.role !== 'admin' && !admin.isAdmin)) {
      return res.status(401).json({ success: false, message: 'Unauthorized access. Admin only.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    debugging(error);
    return res.status(401).json({ success: false, message: 'Invalid token or session expired.' });
  }
};

export default adminAuth;
