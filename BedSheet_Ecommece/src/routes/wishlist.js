// routes/wishlists.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');

// Get all wishlists
router.get('/', async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wishlists' });
  }
});

// Get a wishlist by ID
router.get('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id).populate('items.itemId');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
});

// Create a new wishlist
router.post('/', async (req, res) => {
  try {
    const wishlist = new Wishlist(req.body);
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Error creating wishlist' });
  }
});

// Update a wishlist
router.put('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Error updating wishlist' });
  }
});

// Delete a wishlist
router.delete('/:id', async (req, res) => {
  try {
    await Wishlist.findByIdAndRemove(req.params.id);
    res.json({ message: 'Wishlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting wishlist' });
  }
});

// Add an item to a wishlist
router.post('/:wishlistId/items', async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    wishlist.items.push(req.body);
    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to wishlist' });
  }
});

// Remove an item from a wishlist
router.delete('/:wishlistId/items/:itemId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.wishlistId);
    if (!wishlist) {
 return res.status(404).json({ message: 'Wishlist not found' });
    }
    const itemIndex = wishlist.items.findIndex(item => item.itemId.toString() === req.params.itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }
    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from wishlist' });
  }
});

module.exports = router;