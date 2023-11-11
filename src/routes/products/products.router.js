const express = require('express');
const router = express.Router();
const multer = require('multer');

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });

const {
    httpGetAllProducts,
    httpAddNewProduct,
    httpUpdateProduct,
    httpDeleteProduct,
    verifyToken
} = require('./products.controllers');

router.get('/', verifyToken, (req, res) => {
    return httpGetAllProducts(req, res);
});

router.post('/new', upload.single('image'), (req, res) => {
    return httpAddNewProduct(req, res);
});

router.put('/update', (req, res) => {
    return httpUpdateProduct(req, res);
});

router.delete('/delete', (req, res) => {
    return httpDeleteProduct(req, res);
});

module.exports = router;