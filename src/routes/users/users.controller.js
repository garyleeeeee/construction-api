const jwt = require('jsonwebtoken');
const { 
    getAllUsers,
    findUserById,
    updateUser,
    deleteUser,
    updatePassword,
    addPendingUser,
    signInUser,
    initialisePassword
} = require('../../models/users/users.model');



async function httpGetAllUsers (req, res) {
    try {
        const allUsers = await getAllUsers(); // A non-null result(even an empty Array) will be return, otherwise would be caught as an Error and thrown
        res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    };
};

async function httpFindUserById (req, res) {
    try {
        const userData  = req.body;
        const user = await findUserById(userData.id);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    };
};

async function httpUpdateUser (req, res) {
    try {
        const userData = req.body;
        const user = await updateUser(userData);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    };
};

async function httpDeleteUser (req, res) {
    try {
        const userData = req.body;
        const user = await deleteUser(userData);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    };
}

async function httpAddPendingUser (req, res) {
    try {
        const userData = req.body;
        const user = await addPendingUser(userData);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    };
};

async function httpSignInUser (req, res) {
    try {
        const userData = req.body;
        const user = await signInUser(userData);
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2d' })

        res.status(201).json({ success: true, data: user, accessToken});
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    };
};

async function httpInitialisePassword (req, res) {
    try {
        const userData = req.body;
        const user = await initialisePassword(userData);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
};


async function httpUpdatePassword (req, res) {
    try {
        const userData = req.body;
        const user = await initialisePassword(userData);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
}




module.exports = {
    httpGetAllUsers,
    httpFindUserById,
    httpUpdateUser,
    httpDeleteUser,
    httpAddPendingUser,
    httpSignInUser,
    httpUpdatePassword,
    httpInitialisePassword,
    verifyToken,
}

