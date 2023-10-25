const mongoose = require('mongoose');
const moment = require('moment-timezone');

const WarehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    keeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // This 'ref' refers to the model name we defined earlier
        required: true,
    },
});



// Middleware to update the 'updatedAt' field on document updates
WarehouseSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = moment.tz("Asia/Shanghai").toDate();
    }
    next();
});

const Warehouse = mongoose.model('Warehouse', WarehouseSchema);

module.exports = Warehouse;