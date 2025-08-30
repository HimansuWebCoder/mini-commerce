const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
	name: String,
	image: String,
	subcategories: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
	],
	// products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
})

categorySchema.virtual('products', {
	ref: 'Product',
	localField: '_id',
	foreignField: 'category',
})

categorySchema.set('toObject', { virtuals: true })
categorySchema.set('toJSON', { virtuals: true })

const Category = mongoose.model('Category', categorySchema)

module.exports = { Category }
