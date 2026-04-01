const Product = require('../models/Product');

const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

const createProduct = async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = new Product({
        name,
        price,
        user: req.user._id,
        image,
        brand,
        category,
        countInStock,
        description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

module.exports = { getProducts, getProductById, createProduct };
