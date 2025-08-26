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

module.exports = { getCategories, postCategory }
