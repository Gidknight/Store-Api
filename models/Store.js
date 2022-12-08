const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'product name must be provided'],
      },
    condition: {
      type: String,
      enum:['new', 'used'],
      required:[true, 'the condition must be known'],
      default: "new"
    },
      price: {
        type: Number,
        required: [true, 'product price must be provided'],
      },
      featured: {
        type: Boolean,
        default: false,
      },
      rating: {
        type: Number,
        default: 4.5,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      company: {
        type: String,
        enum: {
          values: ['sony', 'microsoft', 'nintendo', 'marcos'],
          message: '{VALUE} is not supported',
        },
      },

})

module.exports = mongoose.model('Store', StoreSchema)