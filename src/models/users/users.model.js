const User = require('./users.mongo');
const mongoose = require('mongoose');
const { genHash, compareHash } = require('../../utils/utils')

async function getAllUsers () {
    const allUsers = await User.find();
    return allUsers.map(user => {
        user.password = undefined;
        return user;
    });
};

async function findUserById (id) {
    //Check if ID is in right format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID格式有误，请联系管理员!');
    };

    const user = await User.findById(id);
    if (!user) {
        throw new Error('用户ID不存在，请联系管理员!');
    };
    user.password = undefined;
    return user;
}

async function userExists(name, phoneNumber) {
    const nameForUser = await User.findOne({ name });
    const phoneNumberForUser = await User.findOne({ phoneNumber});

    return (nameForUser !== null || phoneNumberForUser !== null);
}

async function addPendingUser (userData) {
    const { name, accessLevel, role, phoneNumber, salary } = userData;
    // Compare with database and make sure there aren't same-name people
    const exists = await userExists(name, phoneNumber);
    console.log(exists)
    if (exists) {
        console.log('用户名或电话号码已存在!')
        throw new Error('用户名或电话号码已存在!');
    };
    const newUser = new User({
        name,
        accessLevel,
        role,
        phoneNumber,
        salary
    });
    
    // Save the new pending user to the database
    const savedUser = await newUser.save();
    savedUser.password = undefined;
    return savedUser;
};

async function signInUser (userData) {
    const { name, password } = userData;
    const user = await User.findOne({name});
    // Username not found
    if (!user) {
        throw new Error('姓名或密码有误!');
    };
    if (user.status === 'pending') {
        throw new Error('用户初始化未完成!');
    };
    const hash = user.password;
    const isMatch = await compareHash(password, hash);
    // Wrong password, need to compare with hash later 
    if (!isMatch) {
        throw new Error('姓名或密码有误!');
    };
    user.password = undefined;
    return user;
};

async function initialisePassword (userData) {
    const { id, password, rePassword } = userData;

    // console.log(userData);
    if (password !== rePassword) {
        throw new Error('New passwords do not match!');
    };

    const user = await User.findById(id);
    if (!user) {
        throw new Error('链接有误，请联系管理员!');
    };
    
    if (user.status !== 'pending') {
        console.log(user.status)
        throw new Error('用户初始化已完成，请直接登录');
    };

    const hash = await genHash(password);
    user.password = hash;
    user.status = 'active';
    const savedUser = await user.save()

    savedUser.password = undefined;
    return savedUser;
};



module.exports = {
    getAllUsers,
    findUserById,
    addPendingUser,
    signInUser,
    initialisePassword
}