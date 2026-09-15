import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'mm_decor_studio_secret_key_luxury_plum_2026'
      );
      req.admin = await Admin.findById(decoded.id).select('-password');
      if (!req.admin) {
        return res.status(401).json({ success: false, message: 'Admin not found or deactivated' });
      }
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid or expired authentication token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'No authorization token provided' });
  }
};
