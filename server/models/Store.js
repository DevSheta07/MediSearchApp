const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  address: { type: String, required: true },
  phone:   { type: String, default: '' },
  location: {
    type:        { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
});

StoreSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Store', StoreSchema);