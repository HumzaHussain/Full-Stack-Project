// routes/orderItems.js
const express = require('express');
const router = express.Router();
const OrderItem = require('../models/orderItem');

// Get all order items
router.get('/', async (req, res) => {
  try {
    const items = await OrderItem.find().populate('orderId');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order items' });
  }
});

// Get an order item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await OrderItem.findById(req.params.id).populate('orderId');
    if (!item) {
      return res.status(404).json({ message: 'Order item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order item' });
  }
});

// Create a new order item
router.post('/', async (req, res) => {
  try {
    const item = new OrderItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order item' });
  }
});

// Update an order item
router.put('/:id', async (req, res) => {
  try {
    const item = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ message: 'Order item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order item' });
  }
});

// Delete an order item
router.delete('/:id', async (req, res) => {
  try {
    await OrderItem.findByIdAndRemove(req.params.id);
    res.json({ message: 'Order item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order item' });
  }
});

module.exports = router;