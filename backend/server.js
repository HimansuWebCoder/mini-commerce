const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
require('dotenv').config(); 
// const Products = require('./models/Products');
const productRouter = require("./routes/products.router.js");
const categoryRouter = require("./routes/category.router.js");
const subcategoryRouter = require("./routes/subcategory.router.js");
// const imageRoutes = require("./routes/imageRoutes.js");
const cloudinary = require("cloudinary");

const connectEstablish = require("./config/db.js");
const app = express(); 
app.use(express.json()); 
app.use(cors({
  origin: [
  'http://localhost:3000',],
    credentials: true
})); 


const PORT = process.env.PORT || 4000;

// DB connection established
connectEstablish();

//Routes 
app.use('/products', productRouter);
app.use("/categories", categoryRouter)
app.use("/subcategories", subcategoryRouter);
// app.use("/api", imageRoutes); 

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})

