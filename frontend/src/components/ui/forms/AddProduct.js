function AddProduct() {
     return (
          <>
               <div className="max-w-[40rem] m-auto p-4 rounded-2xl grid grid-cols-2 relative gap-4  bg-white shadow-2xl">
                    <div
                         onClick={isHideModalHandler}
                         className="absolute cursor-pointer top-2 right-2 p-1 rounded-full aspect-[1/1]"
                    >
                         <MdClose size="30" className="text-black" />
                    </div>

                    <div className="flex flex-col w-full justify-center gap-2 items-start">
                         <label
                              className="font-inter text-xl text-red-400 font-medium"
                              htmlFor="productname"
                         >
                              Name
                         </label>
                         <input
                              type="text"
                              value={productName}
                              onChange={addProduct}
                              placeholder="Product Name"
                              className="bg-gray-100 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                              id="productname"
                         />
                    </div>

                    <div className="flex flex-col w-full justify-center gap-2 items-start">
                         <label
                              className="font-inter text-xl text-red-400 font-medium"
                              htmlFor="productdescription"
                         >
                              Description
                         </label>
                         <textarea
                              row="10"
                              type="text"
                              value={productDescription}
                              onChange={(e) =>
                                   setProductDescription(e.target.value)
                              }
                              placeholder="Product Description"
                              className="bg-gray-100 text-black border h-full text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                              id="productdescription"
                         ></textarea>
                    </div>

                    <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                         <label
                              className="font-inter text-xl text-red-400 font-medium"
                              htmlFor="productprice"
                         >
                              Price
                         </label>
                         <input
                              type="text"
                              value={productPrice}
                              onChange={addProductPrice}
                              placeholder="Product Price"
                              className="bg-gray-100 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                              id="productprice"
                         />
                    </div>

                    <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                         <label
                              className="font-inter text-xl text-red-400 font-medium"
                              htmlFor="productOriginalprice"
                         >
                              Original Price
                         </label>
                         <input
                              type="text"
                              value={productOriginalPrice}
                              onChange={(e) =>
                                   setProductOriginalPrice(e.target.value)
                              }
                              placeholder="Product Price"
                              className="bg-gray-100 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                              id="productOriginalprice"
                         />
                    </div>
                    <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                         <label
                              className="font-inter text-xl text-red-400 font-medium"
                              htmlFor="discount"
                         >
                              Discount
                         </label>
                         <input
                              type="text"
                              value={discount}
                              onChange={(e) => setDiscount(e.target.value)}
                              placeholder="Product Price"
                              className="bg-gray-100 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                              id="discount"
                         />
                    </div>
                    <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                         <label
                              className="font-inter text-xl text-red-400 font-medium"
                              htmlFor="productCategory"
                         >
                              Category
                         </label>
                         <input
                              type="text"
                              value={productCategory}
                              onChange={addProductCategory}
                              placeholder="Product Category"
                              className="bg-gray-100 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                              id="productCategory"
                         />
                    </div>

                    <div className="flex flex-col w-full  justify-center gap-2 items-start">
                         <label
                              className="font-inter text-xl text-red-400 font-medium"
                              htmlFor="productimg"
                         >
                              Image
                         </label>
                         <input
                              type="file"
                              onChange={handleFileChange}
                              className="bg-gray-100 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                              id="productimg"
                         />
                    </div>

                    <button
                         className="p-2 border w-full h-fit m-auto font-bold font-poppins bg-gradient-to-r from-[#2C4E80] to-[#34699A]  text-white text-xl rounded-lg"
                         onClick={addProducts}
                    >
                         Add product
                    </button>
               </div>
          </>
     )
}

export default AddProduct
