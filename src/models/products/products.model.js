const Product = require('./products.mongo');


// Get all products
async function getAllProducts () {
    const allProducts = await Product.find();
    return allProducts;
};


// Add a new product
async function addNewProduct (productData) {
    const {
        name, brand, description, price,
        specification, isFixedAsset, imageUrl
    } = productData;

    const newProduct = new Product({
        name, brand, description, price,
        specification, isFixedAsset, imageUrl
    });

    const savedProduct = newProduct.save();
    return savedProduct;
};

// Delete a product
async function deleteProduct (productData) {
    const { _id } = productData;

    const deletedProduct = await Product.findByIdAndRemove(_id);
    if (!deletedProduct) {
        throw new Error('ID有误，产品删除失败!');
    };
    return deletedProduct;
};

// Update a product
async function updateProduct (productData) {
    const { _id, name, brand, description, price,
        specification, isFixedAsset, imageUrl, isActive } = productData;

    const updatedProduct = await Product.findByIdAndUpdate(_id, {
        name, brand, description, price,
        specification, isFixedAsset, imageUrl, isActive
    }, { new: true });

    if (!updatedProduct) {
        throw new Error('产品信息更新失败!');
    };

    return updatedProduct;
}




module.exports = {
    getAllProducts,
    addNewProduct,
    deleteProduct,
    updateProduct
};