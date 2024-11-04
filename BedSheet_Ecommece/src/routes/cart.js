// routes/carts.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching carts' });
  }
});

// Get a cart by ID
router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Create a new cart
router.post('/', async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error creating cart' });
  }
});

// Update a cart
router.put('/:id', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart' });
  }
});

// Delete a cart
router.delete('/:id', async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.id);
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting cart' });
  }
});

module.exports = router;
