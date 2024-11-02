// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Get an item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item' });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error creating item' });
  }
});

// Update an item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndRemove(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item' });
  }
});
// routes/cart-items.js
// const express = require('express');
// const router = express.Router();
// const Cart = require('../models/cart');
// const Item = require('../models/item');

// // Add an item to a cart
// router.post('/:cartId/items/:itemId', async (req, res) => {
//   try {
//     const cart = await Cart.findById(req.params.cartId);
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     const item = await Item.findById(req.params.itemId);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }
//     cart.items.push({ itemId: item._id, quantity: 1 });
//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: 'Error adding item to cart' });
//   }
// });

// // Remove an item from a cart
// router.delete('/:cartId/items/:itemId', async (req, res) => {
//   try {
//     const cart = await Cart.findById(req.params.cartId);
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     const itemIndex = cart.items.findIndex((item) => item.itemId.toString() === req.params.itemId);
//     if (itemIndex === -1) {
//       return res.status(404).json({ message: 'Item not found in cart' });
//     }
//     cart.items.splice(itemIndex, 1);
//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: 'Error removing item from cart' });
//   }
// });

// module.exports = router;
module.exports = router;