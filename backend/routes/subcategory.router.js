const express = require('express')
const {
	createSubCategory,
	getSubCategories,
	getOneSubCategory,
	updateSubCategory,
	deleteSubCategory,
} = require('../controllers/subcategory.controller.js')

const router = express.Router()

router.post('/', createSubCategory)
router.get('/', getSubCategories)
router.get('/:id', getOneSubCategory)
router.put('/:id', updateSubCategory)
router.delete('/:id', deleteSubCategory)

module.exports = router
