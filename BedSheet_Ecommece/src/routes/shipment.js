// routes/shipments.js
const express = require('express');
const router = express.Router();
const Shipment = require('../models/shipment');

// Get all shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find().populate('orderId');
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching shipments' });
  }
});

// Get a shipment by ID
router.get('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id).populate('orderId');
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching shipment' });
  }
});

// Create a new shipment
router.post('/', async (req, res) => {
  try {
    const shipment = new Shipment(req.body);
    await shipment.save();
    res.status(201).json(shipment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating shipment' });
  }
});

// Update a shipment
router.put('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: 'Error updating shipment' });
  }
});

// Delete a shipment
router.delete('/:id', async (req, res) => {
  try {
    await Shipment.findByIdAndRemove(req.params.id);
    res.json({ message: 'Shipment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting shipment' });
  }
});

module.exports = router;