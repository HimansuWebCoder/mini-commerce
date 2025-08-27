import { Routes, Route } from 'react-router'
import './App.css'
import Layout from './components/Layout.js'
import Products from './components/products/Products.js'
import Category from './components/products/Category.js'
import SubCategory from './components/products/SubCategory.js'
import GetOneProduct from './components/products/GetOneProduct.js'
import OneSubCategory from './components/products/OneSubCategory.js'
import AddProduct from './components/AddProduct.js'

import { CategoryProvider } from './context/CategoryContext'
import { SubCategoryProvider } from './context/SubCategoryContext'
import { ProductsProvider } from './context/ProductsContext'

function App() {
  return (
    <div className="App">
      <CategoryProvider>
        <SubCategoryProvider>
          <ProductsProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="products" element={<Products />} />
                {/*<Route index element={<AddProduct />} />*/}
                <Route path="products/:productId" element={<GetOneProduct />} />

                <Route path="category" element={<Category />} />
                <Route path="subcategory" element={<SubCategory />} />
                <Route
                  path="subcategory/:subcategoryId"
                  element={<OneSubCategory />}
                />
              </Route>
            </Routes>
          </ProductsProvider>
        </SubCategoryProvider>
      </CategoryProvider>
    </div>
  )
}

export default App
