 const express = require("express");
 const productsRouter = express.Router();
 const {Products} = require('../models/products.model');
 const { getProducts, getOneProduct, postProduct, updateProduct, deleteProduct } = require("../controllers/products.controller.js");

// GET all products
 productsRouter.get("/", (req, res) => {
 	getProducts(req, res);
 })

// GET One product
 productsRouter.get("/:id", (req, res) => {
 	getOneProduct(req, res);
 })

 // POST products
 productsRouter.post("/", (req, res) => {
 	postProduct(req, res);
 })

// UPDATE product
 productsRouter.put("/:id", (req, res) => {
 	updateProduct(req, res);
 })

// DELETE product
productsRouter.delete("/:id", (req, res) => {
	deleteProduct(req, res);
})


 module.exports = productsRouter; 