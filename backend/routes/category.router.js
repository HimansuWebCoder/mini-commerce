const express = require("express");
const categoryRouter = express.Router();
const { getCategories, postCategory } = require("../controllers/category.controller");

 // GET categories
 categoryRouter.get("/", (req, res) => {
 	getCategories(req, res);
 })

 // Post category
 categoryRouter.post("/", (req, res) => {
 	postCategory(req, res);
 })


 module.exports = categoryRouter;

