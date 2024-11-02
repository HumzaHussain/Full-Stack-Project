// routes/payments.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find().populate('orderId');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments' });
  }
});

// Get a payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('orderId');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payment' });
  }
});

// Create a new payment
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating payment' });
  }
});

// Update a payment
router.put('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Error updating payment' });
  }
});

// Delete a payment
router.delete('/:id', async (req, res) => {
  try {
    await Payment.findByIdAndRemove(req.params.id);
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting payment' });
  }
});

module.exports = router;