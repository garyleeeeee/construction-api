const express = require('express');
const router = express.Router();

const {
    httpGetAllProducts,
    httpAddNewProduct,
    httpUpdateProduct,
    httpDeleteProduct
} = require('./products.controllers');

router.get('/', (req, res) => {
    return httpGetAllProducts(req, res);
});

router.post('/new', (req, res) => {
    return httpAddNewProduct(req, res);
});

router.put('/update', (req, res) => {
    return httpUpdateProduct(req, res);
});

router.delete('/delete', (req, res) => {
    return httpDeleteProduct(req, res);
});

module.exports = router;