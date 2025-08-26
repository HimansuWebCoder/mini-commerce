const mongoose = require('mongoose'); 

const productSchema = new mongoose.Schema({ 
	productName: String, 
	productPrice: Number, 
	productOriginalPrice: Number,
	discount: Number,
	category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
	subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory"},
	productImg: String,
	productSubImg: [String],
	productDescription: String,
	ProductRating: String,
}); 


	// subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },

const Products = mongoose.model("Product", productSchema)

module.exports = {Products}

