const mongoose = require('mongoose');

const rentalRequestSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  selectedAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fromDate: { type: Date, required: true },
  fromTime: { type: String, required: true },
  endDate: { type: Date, required: true },
  endTime: { type: String, required: true },
  status: { type: String, enum: ['pending','rejected', 'payment', 'shiped','delivered','returned',], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('RentalRequest', rentalRequestSchema);
