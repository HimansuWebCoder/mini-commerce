const express = require("express");
const { createSubCategory, getSubCategories, getOneSubCategory } = require("../controllers/subcategory.controller.js");

const router = express.Router();

router.post("/", createSubCategory);
router.get("/", getSubCategories);
router.get("/:id", getOneSubCategory);

module.exports = router;
