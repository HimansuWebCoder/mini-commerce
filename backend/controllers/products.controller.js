const { Products } = require('../models/products.model')
const mongoose = require('mongoose')

// GET products models
async function getProducts(req, res) {
    try {
        //  const newProducts = await Products.find();
        const newProducts = await Products.find()
            .populate('category', 'name')
            .populate('subcategory', 'name')
        //  .populate({
        //     path: 'subcategory',
        //     populate: { path: 'category' }
        //  });

        if (!newProducts.length) {
            return res.status(404).json({ response: 'Products not found' })
        } else {
            return res.status(200).json({ newProducts })
        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// GET one products model
async function getOneProduct(req, res) {
    const id = req.params.id

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID provided' })
    }

    // const getProduct = await Products.findById(id);
    const getProduct = await Products.findById(id)
        .populate('category')
        .populate('subcategory')

    if (getProduct) {
        return res.status(200).json({ getProduct })
    } else {
        return res.status(404).json({ message: 'Product not found' })
    }
}

// POST products models
async function postProduct(req, res) {
    const newProducts = await Products.create(req.body)
    res.status(201).json({ newProducts })
}

// UPDATE product models
async function updateProduct(req, res) {
    const updateProduct = await Products.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
    )

    if (!updateProduct) {
        return res.status(404).json({ message: 'Product not found' })
    } else {
        return res.json(updateProduct)
    }
}

// DELETE product models
async function deleteProduct(req, res) {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id)
    if (!deletedProduct) {
        res.status(404).json({ message: 'product not found to delete' })
    } else {
        res.json({ response: 'Products deleted successfully' })
    }
}

module.exports = {
    getProducts,
    getOneProduct,
    postProduct,
    updateProduct,
    deleteProduct,
}
