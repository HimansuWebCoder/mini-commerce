const {SubCategory} = require("../models/subcategory.model.js");
const {Category} = require("../models/category.model.js");

 const createSubCategory = async (req, res) => {
  try {
           const subCategory = await SubCategory.create(req.body);

            await Category.findByIdAndUpdate(
            subCategory.category,
            { $push: { subcategories: subCategory._id } },
            { new: true }
          );

           res.status(201).json({subCategory});
         } catch (err) {

          if (err.code === 11000) {
            return res.status(400).json({
              error: "Duplicate subcategory name for this category",
              // details: err.keyValue,  // optional: shows which field caused the error
            });
          }

         res.status(500).json({ error: err.message });
  }

};



 const getSubCategories = async (req, res) => {
  try {
    //  const subcategories = await SubCategory.find().populate({path: "products", select:"productName productPrice productImg"}).populate("category", "name");
    //  const subcategories = await SubCategory.find();
    const subcategories = await SubCategory.find()
    .populate("category", "name")   // only show category name
    .populate("products");  

     if (!subcategories.length) {
         return res.status(404).json({ response: "Subcategories not found" });
     } else {
         return res.status(200).json(subcategories);
     }
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
  
};

// GET one subcategory details
const getOneSubCategory = async(req, res) => {
  const id = req.params.id
  // console.log("Requested SubCategory ID:", id);

    const oneSubCategory = await SubCategory.findById(id).populate({
      path: "products",
      populate: [
        {path: "category", select: "name"},
        {path: "subcategory", select: "name"},
      ]
    });

        return res.status(200).json({oneSubCategory});
}

module.exports = { createSubCategory, getSubCategories, getOneSubCategory };



