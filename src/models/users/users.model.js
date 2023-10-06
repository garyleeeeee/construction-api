const User = require('./users.mongo');
const { genHash, compareHash } = require('../../utils/utils')

async function getAllUsers () {
    const allUsers = await User.find();
    return allUsers.map(user => {
        user.password = undefined;
        return user;
    });
};

async function userExists(username) {
    const user = await User.findOne({ name: username });
    return user !== null;
}

async function addPendingUser (userData) {
    const { name, accessLevel, role, phoneNumber, salary } = userData;
    // Compare with database and make sure there aren't same-name people
    const exists = await userExists(name)
    if (exists) {
        throw new Error('Username has been taken!');
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
        throw new Error('Invalid username or password!');
    };
    if (user.status === 'pending') {
        throw new Error('Account pending!');
    };
    const hash = user.password;
    const isMatch = await compareHash(password, hash);
    // Wrong password, need to compare with hash later 
    if (!isMatch) {
        throw new Error('Invalid username or password!');
    };
    user.password = undefined;
    return user;
};


async function initialisePassword (userData) {
    const { id, password, repassword } = userData;

    if (password !== repassword) {
        throw new Error('New passwords do not match!');
    };

    const user = await User.findById(id);
    if (!user) {
        throw new Error('Invalid user ID!');
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
    addPendingUser,
    signInUser,
    initialisePassword
}