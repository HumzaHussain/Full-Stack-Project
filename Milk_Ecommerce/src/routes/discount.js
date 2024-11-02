// routes/discounts.js
const express = require('express');
const router = express.Router();
const Discount = require('../models/discount');

// Get all discounts
router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching discounts' });
  }
});

// Get a discount by ID
router.get('/:id', async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json(discount);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching discount' });
  }
});

// Create a new discount
router.post('/', async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json(discount);
  } catch (err) {
    res.status(500).json({ message: 'Error creating discount' });
  }
});

// Update a discount
router.put('/:id', async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json(discount);
  } catch (err) {
    res.status(500).json({ message: 'Error updating discount' });
  }
});

// Delete a discount
router.delete('/:id', async (req, res) => {
  try {
    await Discount.findByIdAndRemove(req.params.id);
    res.json({ message: 'Discount deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting discount' });
  }
});

module.exports = router;
