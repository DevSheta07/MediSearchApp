const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    genericName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    dosageForm: {
      type: String,
      default: 'N/A',
      trim: true,
    },
    strength: {
      type: String,
      default: 'N/A',
      trim: true,
    },
    route: {
      type: String,
      default: 'Oral',
      trim: true,
    },
    pricing: {
      branded: {
        type: Number,
        required: true,
        min: 0,
      },
      generic: {
        type: Number,
        required: true,
        min: 0,
      },
      savings: {
        type: Number,
        default: 0,
      },
      savingsPercentage: {
        type: Number,
        default: 0,
      },
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    indication: {
      type: String,
      default: 'N/A',
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    searchTerms: [String], // For faster searching
  },
  { timestamps: true }
);

// Index for faster queries
MedicineSchema.index({ genericName: 1, brandName: 1 });
MedicineSchema.index({ searchTerms: 1 });

module.exports = mongoose.model('Medicine', MedicineSchema);
