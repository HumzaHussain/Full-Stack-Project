// routes/addresses.js
const express = require('express');
const router = express.Router();
const Address = require('../models/address');

// Get all addresses
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching addresses' });
  }
});

// Get an address by ID
router.get('/:id', async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching address' });
  }
});

// Create a new address
router.post('/', async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ message: 'Error creating address' });
  }
});

// Update an address
router.put('/:id', async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: 'Error updating address' });
  }
});

// Delete an address
router.delete('/:id', async (req, res) => {
  try {
    await Address.findByIdAndRemove(req.params.id);
    res.json({ message: 'Address deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting address' });
  }
});

module.exports = router;