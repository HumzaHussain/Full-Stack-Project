// const express = require('express');
// const path = require('path');
// const app = express();
// const srcPath = path.join(__dirname, 'src', 'routes');
// const authRoutes= require(path.join( srcPath, 'auth'));

// app.use(express.json());

// app.use('/api/auth', authRoutes);

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// app.js
const express = require('express');
const path = require('path');
const app = express();
const srcPath = path.join(__dirname, 'src', 'routes');
const authRoutes= require(path.join( srcPath, 'auth'));
const productRoutes= require(path.join( srcPath, 'product'));
const addressRoutes= require(path.join( srcPath, 'address'));
const cartRoutes= require(path.join( srcPath, 'cart'));
const categoryRoutes= require(path.join( srcPath, 'category'));
const discountRoutes= require(path.join( srcPath, 'discount'));
const inventoryRoutes= require(path.join( srcPath, 'inventory'));
const order_itemRoutes= require(path.join( srcPath, 'order_item'));
const shipmentRoutes= require(path.join( srcPath, 'shipment'));
const paymentRoutes= require(path.join( srcPath, 'payment'));
const reviewRoutes= require(path.join( srcPath, 'review'));
const ordersRoutes= require(path.join( srcPath, 'order'));
const wishlistRoutes= require(path.join(srcPath, 'wishlist'));
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/node_database')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error: ', err));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/discount', discountRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/order_item', order_itemRoutes);
app.use('/api/shipment', shipmentRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.listen(5000, () => {
  console.log('Server started on port 5000');
});