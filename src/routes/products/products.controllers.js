const {
    getAllProducts,
    addNewProduct,
    deleteProduct,
    updateProduct
} = require('../../models/products/products.model');

async function httpGetAllProducts (req, res) {
    try {
        const allProducts = await getAllProducts(); // A non-null result(even an empty Array) will be return, otherwise would be caught as an Error and thrown
        res.status(200).json({ success: true, data: allProducts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    };
};

async function httpAddNewProduct (req, res) {
    try {
        const productData= req.body;
        const savedProduct = await addNewProduct(productData); // A non-null result(even an empty Array) will be return, otherwise would be caught as an Error and thrown
        res.status(200).json({ success: true, data: savedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    };
};

async function httpDeleteProduct (req, res) {
    try {
        const productData= req.body;
        const deletedProduct = await deleteProduct(productData); // A non-null result(even an empty Array) will be return, otherwise would be caught as an Error and thrown
        res.status(200).json({ success: true, data: deletedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    };
};

async function httpUpdateProduct (req, res) {
    try {
        const productData= req.body;
        const updatedProduct = await updateProduct(productData); // A non-null result(even an empty Array) will be return, otherwise would be caught as an Error and thrown
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    };
};


module.exports = {
    httpGetAllProducts,
    httpAddNewProduct,
    httpDeleteProduct,
    httpUpdateProduct
}