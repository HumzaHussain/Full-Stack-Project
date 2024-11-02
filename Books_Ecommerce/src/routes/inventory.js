// routes/inventory.js
const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory items' });
  }
});

// Get an inventory item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory item' });
  }
});

// Create a new inventory item
router.post('/', async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error creating inventory item' });
  }
});

// Update an inventory item
router.put('/:id', async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error updating inventory item' });
  }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndRemove(req.params.id);
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting inventory item' });
  }
});

module.exports = router;