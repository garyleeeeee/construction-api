const mongoose = require('mongoose');
const moment = require('moment-timezone');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    accessLevel: {
        type: Number,
        required: true,
        default: 0,
    },
    role: {
        type: String,
        enum: ['施工员', '现场主管', '后勤主管', '项目主管', '出纳', '采购员', '员工', '仓管', '财务', '车辆主管', '资料主管', '资料员', '预算员', '预算主管', '人事主管', '老板'],
        default: '员工',
      },
    password: {
        type: String,
        required: true,
        default: '0000'
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    salary: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'active', 'inactive']
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
UserSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = moment.tz("Asia/Shanghai").toDate();
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;