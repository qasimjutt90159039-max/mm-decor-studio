import express from 'express';
import { Gallery } from '../models/Gallery.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/gallery
// @desc    Get all gallery photos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/gallery
// @desc    Add a new gallery photo
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const { image, title, category, description } = req.body;
    if (!image || !title) {
      return res.status(400).json({
        success: false,
        message: 'Both image URL and title are required',
      });
    }

    const item = await Gallery.create({
      image,
      title,
      category: category || 'Interior',
      description: description || '',
    });

    return res.status(201).json({
      success: true,
      data: item,
      message: 'Gallery item added successfully',
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update a gallery item
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    const { image, title, category, description } = req.body;
    if (image) item.image = image;
    if (title) item.title = title;
    if (category) item.category = category;
    if (description !== undefined) item.description = description;

    const updated = await item.save();
    return res.json({
      success: true,
      data: updated,
      message: 'Gallery item updated successfully',
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete a gallery item
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    await Gallery.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: 'Gallery item removed successfully',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
