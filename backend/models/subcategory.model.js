const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
})

subCategorySchema.index({ category: 1, name: 1 }, { unique: true })

subCategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'subcategory',
})

subCategorySchema.set('toObject', { virtuals: true })
subCategorySchema.set('toJSON', { virtuals: true })

const SubCategory = mongoose.model('SubCategory', subCategorySchema)
module.exports = { SubCategory }
