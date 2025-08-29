const express = require('express')
const categoryRouter = express.Router()
const {
	getCategories,
	getOneCategory,
	postCategory,
	deleteCategory,
	updateCategory,
} = require('../controllers/category.controller')

// GET categories
categoryRouter.get('/', (req, res) => {
	getCategories(req, res)
})

// GET one category
categoryRouter.get('/:id', (req, res) => {
	getOneCategory(req, res)
})

// Post category
categoryRouter.post('/', (req, res) => {
	postCategory(req, res)
})

// Update category
categoryRouter.put('/:id', (req, res) => {
	updateCategory(req, res)
})

// Delete category
categoryRouter.delete('/:id', (req, res) => {
	deleteCategory(req, res)
})

module.exports = categoryRouter
