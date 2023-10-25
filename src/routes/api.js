const express = require('express');

const usersRouter = require('./users/users.router');
const productsRouter = require('./products/products.router');

const api = express.Router();

api.use('/users', usersRouter);

api.use('/products', productsRouter);

module.exports = api;