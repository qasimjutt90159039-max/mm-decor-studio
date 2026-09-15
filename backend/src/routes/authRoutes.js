import express from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'mm_decor_studio_secret_key_luxury_plum_2026',
    { expiresIn: '7d' }
  );
};

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both username and password' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid administrative credentials' });
    }

    const token = generateToken(admin._id);
    return res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/auth/me
// @desc    Verify current session
// @access  Private
router.get('/me', protect, async (req, res) => {
  return res.json({
    success: true,
    admin: req.admin,
  });
});

export default router;
