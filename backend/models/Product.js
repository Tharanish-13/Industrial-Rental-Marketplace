const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  subCategory: { type: String },
  rentalDays: { type: Number },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  location: { type: String },
  district: { type: String },
  city: { type: String },
  pincode: { type: String },
  available: { type: Boolean, default: true },
  quantity: { type: Number, default: 1 },
  images: [String],
  specification: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true }
    }
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
