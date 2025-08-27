const { Category } = require('../models/category.model')
const mongoose = require('mongoose')

// GET categories data models
const getCategories = async (req, res) => {
       const categoriesData = await Category.find().populate('subcategories')
       // const categoriesData = await Category.find().populate("products");

       // const categoriesData = await Category.find();

       if (!categoriesData.length) {
              res.status(404).json({ response: 'Categories not found' })
       } else {
              res.status(200).json({ categoriesData })
       }
}

// POST Category data model
const postCategory = async (req, res) => {
       try {
              const categoryName = await Category.create(req.body)
              res.status(201).json({ categoryName })
       } catch (err) {
              res.status(500).json({ error: err.message })
       }
}

// UPDATE Category data models
async function updateCategory(req, res) {
       const updateCategory = await Category.findByIdAndUpdate(
              req.params.id,
              { $set: req.body },
              { new: true },
       )

       if (!updateCategory) {
              return res.status(404).json({ message: 'Product not found' })
       } else {
              return res.json(updateCategory)
       }
}

// DELETE Category data models
async function deleteCategory(req, res) {
       const deletedCategory = await Category.findByIdAndDelete(req.params.id)
       if (!deletedCategory) {
              res.status(404).json({ message: 'Category not found to delete' })
       } else {
              res.json({ response: 'Category deleted successfully' })
       }
}

module.exports = { getCategories, postCategory, deleteCategory, updateCategory }
