import { useState, useEffect } from 'react'
import { IoAddSharp } from 'react-icons/io5'
import Skeleton from '@mui/material/Skeleton'
import Modal from '../ui/Modal'
import SubCategory from './SubCategory'
import { Link } from 'react-router'
import { Spin } from 'antd'
import { Outlet } from 'react-router'

import { useContext } from 'react'
import { CategoryContext } from '../../context/CategoryContext'

function Category() {
    const {
        categories,
        category,
        setCategory,
        addCategories,
        isLoader,
        setIsLoader,
        isLoading,
        setIsLoading,
    } = useContext(CategoryContext)

    // const [products, setProducts] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [selectCategory, setSelectCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')

    // Category products filter States
    // const [product, setProduct] = useState([...products])

    const [filterProduct, setFilterProduct] = useState([])

    const filterCategory = subCategories.filter((filterItem) => {
        if (selectCategory === filterItem.category) {
            return true
        } else {
            return false
        }
    })

    const [showModal, setShowModal] = useState(false)

    function isShowModalHandler() {
        setShowModal(true)
    }

    function isHideModalHandler() {
        setShowModal(false)
    }

    // Fetch products
    // useEffect(() => {
    //     setIsLoader(true)
    //     setTimeout(() => {
    //         const fetchProducts = async () => {
    //             try {
    //                 const products = await fetch(
    //                     'http://localhost:4000/products',
    //                     {
    //                         method: 'get',
    //                         credentials: 'include',
    //                     },
    //                 )

    //                 const productsData = await products.json()
    //                 setIsLoader(false)
    //                 setProducts(productsData.newProducts)
    //                 console.log('all Products', productsData.newProducts)
    //             } catch (err) {
    //                 console.error('Error fetching products:', err)
    //             }
    //         }

    //         fetchProducts()
    //     }, 2000)
    // }, [])

    // Fetch sub categories
    useEffect(() => {
        setIsLoader(true)
        setTimeout(() => {
            const fetchSubCatgories = async () => {
                const productSubCategory = await fetch(
                    'http://localhost:4000/subcategories',
                    {
                        method: 'get',
                        credentials: 'include',
                    },
                )

                const subCategoryData = await productSubCategory.json()
                setIsLoader(false)
                setSubCategories(subCategoryData)
                console.log('subCategories', subCategoryData)
            }

            fetchSubCatgories()
        }, 1000)
    }, [])

    return (
        <div className=" w-fit grid  grid-cols-1 gap-4 w-full h-full place-content-center place-items-center">
            <div className="grid  shadow-lg grid-cols-1 w-full h-full p-4 gap-4 place-content-center place-items-center">
                <div className="font-poppins text-2xl text-[#44444E] w-full flex justify-between items-center p-2 font-medium">
                    <h1 className="font-poppins text-3xl text-[#44444E] flex justify-start font-medium">
                        Explore by Categories
                    </h1>
                    <div className="flex gap-2 items-center justify-end">
                        <button
                            onClick={isShowModalHandler}
                            className="flex font-base rounded-lg bg-[#EFEFEF] p-2 hover:text-white hover:bg-[#689B8A] font-poppins text-xl text-[#44444E] justify-center items-center"
                        >
                            <IoAddSharp size="20" className="" />
                            Add category
                        </button>
                    </div>
                </div>

                <div className="flex w-full gap-4 items-center justify-start [&::-webkit-scrollbar]:hidden  overflow-x-auto">
                    {isLoader ? (
                        <div className="w-full h-full grid grid-cols-4 gap-4">
                            <Skeleton
                                variant="rounded"
                                width={300}
                                height={300}
                            />
                            <Skeleton
                                variant="rounded"
                                width={300}
                                height={300}
                            />
                            <Skeleton
                                variant="rounded"
                                width={300}
                                height={300}
                            />
                            <Skeleton
                                variant="rounded"
                                width={300}
                                height={300}
                            />
                            <Skeleton
                                variant="rounded"
                                width={300}
                                height={300}
                            />
                            <Skeleton
                                variant="rounded"
                                width={300}
                                height={300}
                            />
                            <Skeleton
                                variant="rounded"
                                width={300}
                                height={300}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full grid grid-cols-4 gap-4 p-4">
                            {categories.map((category) => (
                                <div
                                    className="flex rounded-lg justify-center  items-center"
                                    key={category._id}
                                >
                                    <div
                                        onClick={(e) =>
                                            setSelectCategory(category.category)
                                        }
                                        className="font-poppins justify-center hover:bg-[#73C7C7] hover:text-white focus:bg-[#73C7C7] items-center gap-2 flex-col flex cursor-pointer hover:shadow-md  rounded-lg w-full h-full aspect-[1/1] p-2 font-normal shadow-lg"
                                    >
                                        <div className="max-w-40  h-40">
                                            <img
                                                className="w-full h-full object-contain"
                                                src="/images/shop.png"
                                                alt="shop"
                                            />
                                        </div>
                                        <h1 className="font-poppins  text-[#173B45] text-2xl font-normal">
                                            {category.name}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Modal
                    isTrue={showModal}
                    child={
                        <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                            <label
                                className="font-inter text-xl text-red-400 font-medium"
                                htmlFor="productCategory"
                            >
                                Add New Category
                            </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Product Category"
                                className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                                id="productCategory"
                            />
                            {/*<div className="w-full border flex justify-end items-center">*/}
                            <div className="w-full grid grid-cols-1 place-content-center place-items-end">
                                {isLoading ? (
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            onClick={addCategories}
                                            className="p-2 border flex justify-center items-center gap-2 focus:outline-red-500 w-40 h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A] text-white text-xl rounded-lg"
                                        >
                                            Adding...
                                            <Spin />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={addCategories}
                                        className="p-2 border focus:outline-red-500 w-40 h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A] text-white text-xl rounded-lg"
                                    >
                                        Add
                                    </button>
                                )}
                            </div>
                        </div>
                    }
                    isHideModalHandler={isHideModalHandler}
                    isShowModalHandler={isShowModalHandler}
                />

                {/*  <div className="grid grid-cols-2 m-auto p-4 border w-[500px]">
              
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
                </div>*/}
            </div>

            {/*{
            isLoader ? (
                <>
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                </>
                ) : (
                   <div className="w-full grid grid-cols-4 gap-4">
                     {
            subCategories?.map(subcategory => (
                   <div key={subcategory._id} className="w-full flex justify-end items-center">
                     <button className="ffont-poppins rounded-lg w-full p-2 text-[#173B45] font-poppins text-2xl font-medium shadow-md border">{subcategory.name}</button>
                
                  </div>
            )   )
          }

                   </div>
                )
         }*/}
            {/*<SubCategory />*/}
            <Outlet />
        </div>
    )
}

export default Category
