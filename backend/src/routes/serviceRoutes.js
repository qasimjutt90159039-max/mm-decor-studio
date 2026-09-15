import express from 'express';
import { Service } from '../models/Service.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/services
// @desc    Get services (active only for public, all if requested by admin query)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { active: true };
    const services = await Service.find(filter).sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/services
// @desc    Create a new service
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const { name, category, description, image, active } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name and description are required',
      });
    }

    const service = await Service.create({
      name,
      category: category || 'Interior',
      description,
      image: image || '',
      active: active !== undefined ? active : true,
    });

    return res.status(201).json({
      success: true,
      data: service,
      message: 'Service entry created successfully',
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/services/:id
// @desc    Update a service
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    const { name, category, description, image, active } = req.body;
    if (name) service.name = name;
    if (category) service.category = category;
    if (description) service.description = description;
    if (image !== undefined) service.image = image;
    if (active !== undefined) service.active = active;

    const updated = await service.save();
    return res.json({
      success: true,
      data: updated,
      message: 'Service updated successfully',
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    await Service.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: 'Service entry removed successfully',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
