const express = require('express');
const router = express.Router();
const {
    httpGetAllUsers, 
    httpAddPendingUser, 
    httpSignInUser,
    httpInitialisePassword,
    httpUpdateUser,
    httpDeleteUser,
    httpFindUserById,
    verifyToken,
} = require('./users.controller');

// Get all users 
router.get('/', verifyToken, async (req, res) => {
    return httpGetAllUsers(req, res);
});

// Get User by ID
router.post('/findbyid', async (req, res) => {
    return httpFindUserById(req, res);
})

// Register a new user
router.post('/register', async (req, res) => {
    return httpAddPendingUser(req, res);
});

// Update a user
router.put('/update', async (req, res) => {
    return httpUpdateUser(req, res);
});

// Delete a user
router.delete('/delete', async (req, res) => {
    return httpDeleteUser(req, res);
});

// Sign In a user
router.post('/login', async (req, res) => {
    return httpSignInUser(req, res);
});

// Initiate new user password
router.post('/password', async (req, res) => {
    return httpInitialisePassword(req, res);
})


module.exports = router;