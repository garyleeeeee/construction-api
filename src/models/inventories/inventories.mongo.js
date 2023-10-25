const mongoose = require('mongoose');
const moment = require('moment-timezone');

// 库存
const InventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // This 'ref' refers to the model name we defined earlier
        required: true
    },
    category: {
        type: String,
        enum:['办公用品','生活用品','办公设备','生活设备',
        '施工工具','临水配件','临电配件','劳保用品',
        '电气设备','水施设备','装饰材料','防水材料',
        '结构型材','结构木材','措施材料','建筑原料',
        '测量设备','信息化设备','智能化设备'],
        required: true,
    },
    subCategory: {
        type: String
    },
    quantityInStock: {
        type: Number,
        default: 0,
    },
    quantityAlert: {
        type: Number,
        default: 0,
    },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',  // This 'ref' refers to the model name we defined earlier
        required: true,
    },
    location: { 
        type: String,
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

// Middleware to update the 'updatedAt' field on document updates
InventorySchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = moment.tz("Asia/Shanghai").toDate();
    };
    next();
});


const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;