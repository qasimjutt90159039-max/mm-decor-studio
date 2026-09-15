import express from 'express';
import { Inquiry } from '../models/Inquiry.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Submit a project or studio inquiry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, interestedIn, subject, message, portfolioId } = req.body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide your full name.' });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return res.status(400).json({ success: false, message: 'Please provide a valid contact phone number.' });
    }

    if (email && email.trim().length > 0) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address or leave it blank.' });
      }
    }

    const validInterests = ['Interior Design', 'Event Planning', 'General Inquiry'];
    const chosenInterest = validInterests.includes(interestedIn) ? interestedIn : 'General Inquiry';

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please specify the subject of your inquiry.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide a message or details of your inquiry.' });
    }

    const inquiry = await Inquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      interestedIn: chosenInterest,
      subject: subject.trim(),
      message: message.trim(),
      portfolioId: portfolioId || null,
      status: 'new',
    });

    return res.status(201).json({
      success: true,
      data: inquiry,
      message: 'Thank you for reaching out to MM Decor Studio. Your inquiry has been received.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries with search & filter
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const { search, interestedIn, status } = req.query;
    const filter = {};

    if (interestedIn && interestedIn !== 'All') {
      filter.interestedIn = interestedIn;
    }

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: regex }, { phone: regex }, { subject: regex }, { message: regex }];
    }

    const inquiries = await Inquiry.find(filter)
      .populate('portfolioId', 'title category')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry status (e.g. read/contacted)
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    const { status } = req.body;
    if (status && ['new', 'read', 'contacted'].includes(status)) {
      inquiry.status = status;
    }

    const updated = await inquiry.save();
    return res.json({
      success: true,
      data: updated,
      message: 'Inquiry status updated',
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete inquiry
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    await Inquiry.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: 'Inquiry removed successfully',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
