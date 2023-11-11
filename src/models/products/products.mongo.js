const mongoose = require('mongoose');
const moment = require('moment-timezone');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        default: '',
        required: true,
    },
    description: {
        type: String,
        default: '无',
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    specification: {
        type: String,
        required: true,
    },
    isFixedAsset: {
        type: Boolean,
        default: false,
        required: true,
    },
    isActive: { 
        type: Boolean,
        default: true,
    },
    imageUrl: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: () => moment.tz("Asia/Shanghai").toDate(),
    },
    updatedAt: {
        type: Date,
        default: () => moment.tz("Asia/Shanghai").toDate(),
    }
});

ProductSchema.index({ name: 1, brand: 1, specification: 1 }, { unique: true });

// Middleware to update the 'updatedAt' field on document updates
ProductSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = moment.tz("Asia/Shanghai").toDate();
    }
    next();
});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;