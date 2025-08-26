import { Routes, Route } from "react-router";
import './App.css';
import Layout from "./components/Layout.js";
import Products from "./components/products/Products.js";
import Categories from "./components/products/Category.js";
import SubCategory from "./components/products/SubCategory.js";
import GetOneProduct from "./components/products/GetOneProduct.js";
import AddProduct from "./components/AddProduct.js";

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path="/" element={<Layout/>} >
          <Route path="products" element={<Products />}>
            {/*<Route index element={<AddProduct />} />*/}
             <Route path=":productId" element={<GetOneProduct />} /> 
          </Route>
            
          <Route path="categories" element={<Categories />} >
             <Route path="subcategory" element={<SubCategory />} /> 
          </Route> 
         </Route>
      </Routes>   
    </div>
  );
}

export default App;

