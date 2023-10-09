const express = require('express');
const router = express.Router();
const {
    httpGetAllUsers, 
    httpAddPendingUser, 
    httpSignInUser,
    httpInitialisePassword,
    verifyToken,
    httpFindUserById
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

// Sign In a user
router.post('/login', async (req, res) => {
    return httpSignInUser(req, res);
});

// Initiate new user password
router.post('/password', async (req, res) => {
    return httpInitialisePassword(req, res);
})


module.exports = router;