const Warehouse = require('./warehouses.mongo');

async function getAllWarehouses () {
    const allWarehouses = await Warehouse.find();
    return allWarehouses;
};


module.exports = {
    getAllWarehouses,

};