import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router";
import GetOneProduct from "./GetOneProduct";
import ProductCard from "./ProductCard";
import Category from "./Category";
import { Outlet } from "react-router";

import { Spin } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { IoAddSharp } from "react-icons/io5";

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function Products() {   
     const [ products, setProducts ] = useState([]);
     const [ productName, setProductName ] = useState("");
     const [ productDescription, setProductDescription ] = useState("");
     const [ productCategory, setProductCategory ] = useState("");
     const [ category, setCategory ] = useState("");
     const [ categories, setCategories ] = useState([]);
     const [ productPrice, setProductPrice ] = useState("");
     const [ productOriginalPrice, setProductOriginalPrice ] = useState("");
     const [ discount, setDiscount ] = useState("");
     const [ productImg, setProductImg ] = useState("");
     const [ isLoading, setIsLoading ] = useState(true);
    
     const [loader, setLoader] = useState(false);

     const [imageFile, setImageFile] = useState(null);
     const [imageUrl, setImageUrl] = useState("");
     const [ imageFileShow, setImageFileShow ] = useState(null);

     const [ isShowModal, setIsShowModal ] = useState(false);
     const [ showModalId, setIsShowModalId ] = useState(null);
     const [ isShowPopup, setIsShowPopup] = useState(false);

     const [ isShowProducts, setIsShowProducts ] = useState(false);
     const [ isShowCategory, setIsShowCategory ] = useState(false);

     // Edit product States
     const [ editProductName, setEditProductName ] = useState(null);
     const [ editProductCategory, setEditProductCategory ] = useState(null);
     const [ editProductDescription, setEditProductDescription] = useState(null);
     const [ editProductPrice, setEditProductPrice ] = useState(null);
     const [ editProductImg, setEditProductImg ] = useState(null);
   
   // Category products filter States
    const [ product, setProduct ] = useState([...products]);
    // const [ categories, setCategories ] = useState([]);
    const [ isLoader, setIsLoader ] = useState(false);
    const [ selectCategory, setSelectCategory ] = useState("");

    const [ filterProduct, setFilterProduct ] = useState([]);

     const filterCategory = products.filter((filterItem) => {
           if (selectCategory === filterItem.productCategory) {
                return true;
             } else {
                return false;
             }
        });

    useEffect(() => {
        setIsLoader(true);
        setTimeout(() => {
        const fetchCatgories = async () => {
            const productCategory = await fetch("http://localhost:4000/categories", {
                method: "get",
                credentials: "include"
            })

            const categoryData = await productCategory.json();
            setIsLoader(false)
            setCategories(categoryData.categoriesData);
           // console.log("filter product", product);
        // console.log("category products", product);
            // console.log("categorydata", categoryData.categoriesData);
        }

        fetchCatgories();

    }, 3000)
    }, [])



    // console.log("all products category", products)
         const handleFileChange = (e) => {
          setImageFile(e.target.files[0]);
          if (e.target.files[0]) {
                setImageFileShow(URL.createObjectURL(e.target.files[0]));
             }

             // console.log("image selected", imageFileShow);
         };

         function popupHandler(e) {
                setIsShowPopup(true);
                if (e.target) {
              setIsShowModal(false); 
                }
            }


             function isShowHandler(id) {
            setIsShowModalId(id); 
          }

               function isHideHandler() {
              setIsShowModalId(null); 
          }

              function isShowModalHandler() {
              setIsShowModal(true); 
          }

              function isHideModalHandler() {
              setIsShowModal(false); 
              setImageFileShow("");
                window.location.reload()
          }
 
 // Fetch product categories
          useEffect(() => {
            setIsShowProducts(true);
            setIsShowCategory(false)
            const fetchCategories = async() => {

            const categories = await fetch("http://localhost:4000/categories", {
                method: "get",
                credentials: "include"
            })

                const categoryData = await categories.json();
                setCategories(categoryData.categoriesData);
                console.log("all categories", categoryData.categoriesData);
            }

            fetchCategories();
          }, [])

// Post Categories

          function addCategories() {
            fetch("http://localhost:4000/categories", {
              method: "post",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({ category }),
              credentials: "include"
             })
            .then(res => res.json())
            .then(() => {
                fetch("http://localhost:4000/categories", {
               method: "get",
               credentials: "include"
               })
                  .then(res => res.json())
                  .then(newProducts => {
                   setCategories([...categories, category]);
                })
            })
          }

// fetch all products function
function fetchAllProducts() {
        setIsLoading(true);
        setIsShowProducts(true);
        setIsShowCategory(false)
     setTimeout(() => {
      const fetchProducts = async () => {
        try {
            const products = await fetch("http://localhost:4000/products", {
                method: "get",
                credentials: "include"
            });

            const productsData = await products.json();
               setIsLoading(false);
            setProducts(productsData.newProducts);
            // console.log("all Products", productsData.newProducts);

        } catch (err) {
            console.error("Error fetching products:", err);
        }
      };

      fetchProducts();
        }, 2000)

}
            
 // Fetch products
   useEffect(() => {
        setIsLoading(true);
     setTimeout(() => {
   	  const fetchProducts = async () => {
   	  	try {
   	  		const products = await fetch("http://localhost:4000/products", {
   	  			method: "get",
   	  			credentials: "include"
   	  		});

   	  		const productsData = await products.json();
            setIsLoading(false);
   	  		setProducts(productsData.newProducts);
            console.log("all Products", productsData.newProducts);
   	  	} catch (err) {
   	  		console.error("Error fetching products:", err);
   	  	}
   	  };

   	  fetchProducts();
        }, 2000)
   }, [])

   function addProduct(e) {
          setProductName(e.target.value);
     }

   function addProductCategory(e) {
          setProductCategory(e.target.value);
          // console.log("target value", e.target.value)
     }


   function addProductPrice(e) {
          setProductPrice(e.target.value);
     }

   function addProductImg(e) {
        if (e.target.value) {
          setProductImg(e.target.value);
        } else {
            setProductImg("https://ecommerce-sand-beta-81.vercel.app/images/gamepad.png")
        }
     }

function deleteCloudinaryImg() {
    fetch("https://api.cloudinary.com/v1_1/dtiasevyl/image/destroy", {
        method: "delete",
        body: JSON.stringify({
            public_id: "p6gp59lk1wdfhuwez2x9",
        }),
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
        console.log("Image updated in Cloudinary:", data);  
    })
}


// add products
async function addProducts() {
    setLoader(true)
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "images");


    const res = await fetch("https://api.cloudinary.com/v1_1/dtiasevyl/image/upload", {
      method: "POST",
      body: data,
    });

    const cloudData = await res.json();
    // console.log("Cloudinary URL:", cloudData.secure_url);
    setImageUrl(cloudData.secure_url);


     fetch("http://localhost:4000/products", {
          method: "post",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ productName, productCategory, productOriginalPrice, category, discount, productImg: cloudData.secure_url, productPrice, productDescription }),
          credentials: "include"
     })
     .then(res => res.json())
     .then(() => {
          fetch("http://localhost:4000/products", {
               method: "get",
               credentials: "include"
          })
          .then(res => res.json())
          .then(newProducts => {
                setProducts(newProducts);
                setProductName("");
                // window.location.reload();
                setProductCategory("");
                setProductPrice("");
                setProductImg("");
                setImageFileShow("");
                setProductDescription("");
                setProductOriginalPrice("")
                setDiscount("");
                setLoader(false)
                // isHideModalHandler();
                // setIsShowModal(false); 
                isHideModalHandler();
          })
     })
}


	return (
         <div className="flex flex-col">
                   {/* <div className="w-full grid grid-cols-1 gap-8 h-fit relative m-auto to-red-500">
            
                     <div className="bg-gradient-to-r from-[#2C4E80] to-[#34699A]  shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                        <div className="flex items-center w-12 h-fit aspect-[1/1] gap-2">
                        <Link to="/">
                           <img src="./images/shop.png" alt="logo" className="w-full h-full object-contain" />
                        </Link>
                        </div>
                        <h1 className="text-white cursor-pointer text-2xl font-roboto font-bold">All Products</h1>
                      </div>

 
                      <button
                        onClick={isShowModalHandler}
                        className="flex items-center gap-2 bg-[#EFEEEA] hover:bg-white text-[#273F4F] font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                      >
                        <CiCirclePlus size="24" />
                        Add New product
                      </button>
                </div>
                 </div>*/}
         {/*<Category products={products} />*/}

{/* CATEGORY FILTER PRODUCTS COMPONENT SECTION START HERE*/}

                  {/*<div className="border w-fit grid shadow-lg grid-cols-3 gap-60 w-full p-4 place-content-center place-items-center">
          <h1 className="font-poppins text-2xl text-[#44444E] w-full flex justify-start font-medium">Explore by Categories</h1>
          <div className="flex gap-4 items-center justify-center">
          <button onClick={fetchAllProducts} className="font-poppins rounded-lg w-fit p-2 text-[#173B45] font-normal shadow-md border">All</button>
         {
            isLoader ? (
                <>
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                </>
                ) : (
                   <>
                     {
            categories.map(category => (
                   <div key={category._id}>
                      <button onClick={(e) => {setSelectCategory(category.category); setIsShowProducts(false); setIsShowCategory(true)}} className="font-poppins rounded-lg w-fit p-2 text-[#173B45] font-normal shadow-md border">{category.category}</button>
                   </div>
                            ))
                      }
                   </>
                )
         }
          </div>
          <div className="flex gap-2 items-center justify-end w-full">
            <button className="flex font-medium rounded-lg bg-[#229799] p-2 text-white border hover:bg-[#689B8A] font-poppins text-xl text-[#44444E] justify-center items-center"><IoAddSharp size="20" className=""/>Add category</button>
          </div>


     </div>
*/}
      <div className="grid grid-cols-2 md:grid-cols-5 m-auto p-4">
             {
                isShowCategory && (
                    <>
                {
                    filterCategory.map((product) => (
                                     
                                        <div key={product._id} className="grid grid-cols-1 gap-1 md:gap-3 p-4 relative rounded-lg shadow-lg">
                                     
                                               <div className="">

                                                <div className="bg-[#f5f5f5] w-full h-40 rounded-sm aspect-[1/1] relative p-8">
                                                    <Link to={`/products/${product._id}`} className="">
                                                        <img className="w-full h-full object-contain" src={product.productImg} alt="product image"/>
                                                    </Link>
                                                </div>
                                              </div>
                                           
                                        
                                       <div className="w-full text-left line-clamp-2">
                                           <h3 className="text-sm md:text-xl line-clamp-1 md:line-clamp-none text-[#44444E] font-medium font-poppins">{product.productName}</h3>
                                       </div>
                                       <div className="flex w-full flex-col justify-between items-start h-auto">
                                           <div className="text-left line-clamp-3">
                                               <p className="text-gray-500 font-poppins tracking-widest">${product.productDescription}</p>
                                           </div>
                                            <div>
                                               <p className="text-[#db4444] font-poppins">${product.productPrice}</p>
                                           </div>
                                           <div className="w-fit h-fit rounded-lg bg-gray-200 p-2">
                                               <p className="text-gray-600 font-roboto text-sm font-medium">{product.productCategory}</p>
                                           </div>
                                       </div>
                                     </div>
                         ))
                }
                </>

                    )
             } 
                </div> 

{/* CATEGORY FILTER PRODUCTS COMPONENT SECTION END HERE*/}



       
                       
                 {/*onClick={popupHandler}*/}
    {/*{
        isShowModal && (
            <div  style={{backgroundImage: `url("./images/bg.png")`}} className="fixed top-0 flex justify-center items-center backdrop-filter backdrop-blur-[2px] left-0 z-20 w-full h-screen">
               <div className="w-full h-fit">

             <div className="max-w-[40rem] m-auto p-4 rounded-2xl grid grid-cols-2 relative gap-4  bg-white shadow-2xl">
                 <div onClick={isHideModalHandler} className="absolute cursor-pointer top-2 right-2 p-1 rounded-full aspect-[1/1]">
                    <MdClose  size="30" className="text-black"/>
                </div>

                    <div className="flex flex-col w-full justify-center gap-2 items-start">
                         <label className="font-inter text-xl text-red-400 font-medium" htmlFor="productname">Name</label>
                         <input 
                         type="text"
                         value={productName}
                         onChange={addProduct}
                         placeholder="Product Name"
                         className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                         id="productname" />
                    </div>

                    <div className="flex flex-col w-full justify-center gap-2 items-start">
                         <label className="font-inter text-xl text-red-400 font-medium" htmlFor="productdescription">Description</label>
                         <textarea 
                         row="10"
                         type="text"
                         value={productDescription}
                         onChange={(e) => setProductDescription(e.target.value)}
                         placeholder="Product Description"
                         className="bg-gray-100 text-black border h-full text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                         id="productdescription"></textarea>
                    </div>

                    <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                         <label className="font-inter text-xl text-red-400 font-medium" htmlFor="productprice">Price</label>
                         <input 
                         type="text"
                         value={productPrice}
                         onChange={addProductPrice}
                         placeholder="₹"
                         className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                         id="productprice" />
                    </div>

                    <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                         <label className="font-inter text-xl text-red-400 font-medium" htmlFor="productOriginalprice">Original Price</label>
                         <input 
                         type="text"
                         value={productOriginalPrice}
                         onChange={(e) => setProductOriginalPrice(e.target.value)}
                         placeholder="₹"
                         className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                         id="productOriginalprice" />
                    </div>
                    <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                         <label className="font-inter text-xl text-red-400 font-medium" htmlFor="discount">Discount</label>
                         <input 
                         type="text"
                         value={discount}
                         onChange={(e) => setDiscount(e.target.value)}
                         placeholder="₹"
                         className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                         id="discount" />
                    </div>

                    <div className="flex flex-col w-full h-fit  justify-center gap-2 items-start">
                         <label className="font-inter text-xl text-red-400 font-medium" htmlFor="select-category">Categories</label>
                        <select className="w-full rounded-lg h-fit p-2 focus:outline-red-400" onChange={addProductCategory} value={productCategory} id="select-category" name="select-category">
                        {
                            categories.map(category => (
                            <option value={category.category}>{category.category}</option>
                                ))
                        }
                        </select>
                    </div>

                    <div className="flex flex-col w-full  justify-center gap-2 items-start">
                         <label className="font-inter text-xl text-red-400 font-medium" htmlFor="productimg">Image</label>
                         <input 
                         type="file"
                         onChange={handleFileChange}
                         className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                         id="productimg" />

                           {
                            imageFileShow ? (
                              <img src={imageFileShow} alt="" className="w-8 h-8 bg-white border-white outline-white"/>
                                       
                                ) : null
                           }
                           

                    </div>

                         <button className="p-2 border focus:outline-red-500 w-full h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A]  mt-9 text-white text-xl rounded-lg" onClick={addProducts}>
                         { loader ? (<span className="block flex justify-center items-center gap-2">Adding your product...<Spin className=""/></span>) : (<span className="">Add product</span>)}
                         </button>
             </div>
             </div>
             </div>
            )
    }*/}
     {
        isShowProducts && <ProductCard />
     }
                    {/*<ProductCard />*/}
                    
                    {/*<Outlet />*/}
             
         </div>
		)
}

export default Products;


