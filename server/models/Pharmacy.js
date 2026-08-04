const mongoose = require('mongoose');

const PharmacySchema = new mongoose.Schema(
  {
    kendraCode:      { type: String, required: true, unique: true, trim: true },
    name:            { type: String, required: true, trim: true },
    address:         { type: String, required: true, trim: true },
    city:            { type: String, required: true, index: true },
    state:           { type: String, required: true },
    pincode:         { type: String, required: true },
    phone:           { type: String, default: '+91 1800-180-8080' },
    openingHours:    { type: String, default: '09:00 AM - 09:00 PM' },
    location: {
      type:        { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    inStockGenerics: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

PharmacySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Pharmacy', PharmacySchema);
