import express from 'express';
import { Portfolio } from '../models/Portfolio.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/portfolio
// @desc    Get all portfolio items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    const items = await Portfolio.find(filter).sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/portfolio/:id
// @desc    Get single portfolio item by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio project not found' });
    }
    return res.json({
      success: true,
      data: item,
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Portfolio project not found' });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/portfolio
// @desc    Create new portfolio item
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const { title, category, description, images, location, date } = req.body;
    
    if (!title || !description || !images || (Array.isArray(images) && images.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and at least one image URL are required',
      });
    }

    const project = await Portfolio.create({
      title,
      category: category || 'Interior',
      description,
      images: Array.isArray(images) ? images : [images],
      location: location || '',
      date: date || '',
    });

    return res.status(201).json({
      success: true,
      data: project,
      message: 'Portfolio project published successfully',
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/portfolio/:id
// @desc    Update portfolio item
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Portfolio project not found' });
    }

    const { title, category, description, images, location, date } = req.body;
    if (title) project.title = title;
    if (category) project.category = category;
    if (description) project.description = description;
    if (images) project.images = Array.isArray(images) ? images : [images];
    if (location !== undefined) project.location = location;
    if (date !== undefined) project.date = date;

    const updated = await project.save();
    return res.json({
      success: true,
      data: updated,
      message: 'Portfolio project updated successfully',
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/portfolio/:id
// @desc    Delete portfolio item
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Portfolio project not found' });
    }

    await Portfolio.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: 'Portfolio project removed successfully',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
