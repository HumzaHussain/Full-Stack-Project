const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Schema
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
        match: /.+\@.+\..+/ // Basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length for password
        maxlength: 255
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'seller'],
        default: 'customer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


userSchema.pre('save', async function(next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

//category schema
const categorySchema = new mongoose.Schema({
  name: String,
  description: String
});

// //Product Schema
// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cateory' },
//   sellerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
//   imageUrl:{type: String,required: true},
//   createdAt:{ type: Date, default: Date.now },
//   updatedAt:{ type: Date, default: Date.now }
// });

//Address Schema
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country : { type: String, required: true },
  userId :  { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

//Inventory Schema
const inventorySchema = new mongoose.Schema({
  prodId :  { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
  quantity: { type: Number, required: true },
});

//Order Schema 
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  orderId: { type: mongoose.Schema.Types.ObjectId,ref: 'Order',required: true},
  quantity: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  totalAmount: { type: Number,required: true, min: 0 },
  status: { type: String,enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
  paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment' // Assuming you have a Payment model
  },
  shippingAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address' // Assuming you have an Address model
  }
});


//Order item schema
const orderItemSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

//Payment schema
const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  payment_method: { type: String,enum: ['credit_card', 'paypal', 'bank_transfer'],      default: 'pending'
    },
  payment_status: { type: String,enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    }
});

//Review Schema
const reviewSchema = new mongoose.Schema({
  productId : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  userId : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now }
});

//Shipment Schema
const shipmentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
  trackingNumber: { type: String, required: true },
  carrier: { type: String, required: true },
  shipmentDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  status: {type:String,enum : ['processing', 'shipped', 'in_transit', 'delivered'], default :'processing'
    }
});

//Item cart schema
const itemcartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  stock: { type: Number, required: true, min: 0 }
});

//Cart Schema
const cartSchema = new mongoose.Schema({
  items: [{ 
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true, min: 1 }
  }],
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

//Discount schema
const discountSchema = new mongoose.Schema({
  //product id will be added
  code: { type: String, required: true, unique: true },
  percentage: { type: Number, required: true, min: 0, max: 100 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  active: { type: Boolean, default: true }
});

//wishlist Schema
const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    addedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category',categorySchema);
const Product = mongoose.model('Product',productSchema);
const Address = mongoose.model('Address', addressSchema);
const Inventory = mongoose.model('Inventory', inventorySchema);
const Order = mongoose.model('Order', orderSchema);
const OrderItem = mongoose.model('OrderItem', orderItemSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Review = mongoose.model('Review', reviewSchema);
const Shipment = mongoose.model('Shipment', shipmentSchema);
const Item_Cart = mongoose.model('Item_cart', itemcartSchema);
const Cart = mongoose.model('Cart', cartSchema);
const Discount = mongoose.model('Discount', discountSchema);
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = {User,Category,Product,Address,Inventory,Order,OrderItem,Payment,Review,Shipment,Item_Cart,Cart,Discount,Wishlist};
