import { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import Skeleton from '@mui/material/Skeleton'
import Modal from '../ui/Modal'
import { IoAddSharp } from 'react-icons/io5'
import { Link } from 'react-router'
import { Spin } from 'antd'

import { useContext } from 'react'
import { CategoryContext } from '../../context/CategoryContext'
import { SubCategoryContext } from '../../context/SubCategoryContext'

function SubCategory() {
    const { categories } = useContext(CategoryContext)
    const {
        subCategories,
        subCategory,
        addSubCategories,
        setSubCategory,
        category,
        setCategory,
        oneSubCategory,
        setOneSubCategory,
        subCategoryProducts,
        setSubCategoryProducts,
        fetchOneSubCategory,
        isLoaderSkeleton,
        setIsLoaderSkeleton,
        isLoader,
        setIsLoader,
        isLoading,
        setIsLoading,
    } = useContext(SubCategoryContext)

    const [showModal, setShowModal] = useState(false)

    function setCategoryId(e) {
        setCategory(e.target.value)
        console.log('category id', e.target.value)
    }

    function isShowModalHandler() {
        setShowModal(true)
    }

    function isHideModalHandler() {
        setShowModal(false)
        window.location.reload()
    }

    return (
        <div className=" w-full h-full place-content-start place-items-start gap-4 p-4 grid grid-cols-1">
            <Outlet />
            {/* Subcategory Item Add Button Start*/}
            <div className="flex gap-2 items-center justify-end w-full">
                <button
                    onClick={isShowModalHandler}
                    className="flex font-base rounded-lg bg-[#EFEFEF] p-2 hover:text-white hover:bg-[#273F4F] font-poppins text-xl text-[#44444E] justify-center items-center"
                >
                    <IoAddSharp size="20" className="" />
                    Add Subcategory
                </button>
            </div>
            {/* Subcategory Item Add Button End*/}

            {isLoader ? (
                <div className="flex gap-2">
                    <Skeleton variant="rounded" width={80} height={40} />
                    <Skeleton variant="rounded" width={90} height={40} />
                    <Skeleton variant="rounded" width={90} height={40} />
                    <Skeleton variant="rounded" width={90} height={40} />
                    <Skeleton variant="rounded" width={90} height={40} />
                    <Skeleton variant="rounded" width={90} height={40} />
                    <Skeleton variant="rounded" width={90} height={40} />
                    <Skeleton variant="rounded" width={90} height={40} />
                </div>
            ) : (
                // <div className="w-full border p-2 flex justify-center items-center gap-4">
                <div className="w-full grid grid-cols-1">
                    <div className="grid grid-cols-4  p-2 gap-4 w-full">
                        {subCategories.map((subcategory) => (
                            <div
                                key={subcategory._id}
                                className="w-full flex justify-center items-center"
                            >
                                <div
                                    onClick={() =>
                                        fetchOneSubCategory(subcategory._id)
                                    }
                                    className="cursor-pointer flex flex-col gap-2 justify-center items-center  focus:bg-[#EFEFEF] focus:border-0 rounded-lg w-full p-2 text-[#173B45] font-base hover:shadow-lg border"
                                >
                                    <div className="max-w-40  h-40">
                                        <img
                                            className="w-full h-full object-contain"
                                            src="/images/shop.png"
                                            alt="shop"
                                        />
                                    </div>

                                    <h1 className="font-poppins  text-[#173B45] text-2xl font-normal">
                                        {subcategory.name}
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*<p className="text-7xl">{oneSubCategory.name}</p>*/}
                </div>
            )}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 w-[80rem] md:grid-cols-4 sm:grid-cols-2 p-4">
                {isLoaderSkeleton ? (
                    <div className="flex gap-4 w-full border">
                        <Skeleton variant="rounded" width={400} height={200} />
                        {/*<Skeleton variant="rounded" width={320} height={400} />*/}
                        {/*<Skeleton variant="rounded" width={320} height={400} />*/}
                    </div>
                ) : (
                    <>
                        {subCategoryProducts.map((product) => (
                            <div
                                key={product._id}
                                className="grid grid-cols-1 gap-1 md:gap-3 p-4 relative rounded-lg shadow-lg"
                            >
                                <div className="">
                                    <div className="bg-[#f5f5f5] w-full h-40 rounded-sm aspect-[1/1] relative p-4">
                                        <Link
                                            to={`/products/${product._id}`}
                                            className=""
                                        >
                                            <img
                                                className="w-full h-full object-contain"
                                                src={product.productImg}
                                                alt="product image"
                                            />
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-full text-left line-clamp-2">
                                    <h3 className="text-sm md:text-xl line-clamp-1 md:line-clamp-none text-[#44444E] font-medium font-poppins">
                                        {product.productName}
                                    </h3>
                                </div>
                                <div className="flex w-full flex-col justify-between items-start h-auto">
                                    <div className="text-left line-clamp-3">
                                        <p className="text-gray-500 font-poppins tracking-widest">
                                            ${product.productDescription}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[#db4444] font-poppins">
                                            ${product.productPrice}
                                        </p>
                                    </div>
                                    <div className="w-fit h-fit rounded-lg bg-gray-200 p-2">
                                        <p className="text-gray-600 font-roboto text-sm font-medium">
                                            {product.subcategory.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            <Modal
                child={
                    <div className=" flex flex-col w-full justify-center gap-2 items-start">
                        <label
                            className="font-inter text-xl text-red-400 font-medium"
                            htmlFor="productCategory"
                        >
                            Add SubCategory
                        </label>
                        <input
                            type="text"
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            placeholder="Product Category"
                            className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                            id="productCategory"
                        />
                        {/*
                         <label className="font-inter text-xl text-red-400 font-medium" htmlFor="productCategory">Add Category</label>
                         <input 
                         type="text"
                         value={category}
                         onChange={(e) => setCategory(e.target.value)}
                         placeholder="Product Category"
                         className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                         id="productCategory" />*/}

                        <label
                            className="font-inter text-xl text-red-400 font-medium"
                            htmlFor="select-category"
                        >
                            Categories
                        </label>
                        <select
                            className="w-full rounded-lg h-fit p-2 text-[#44444E] focus:outline-red-400"
                            onChange={setCategoryId}
                            value={category}
                            id="select-category"
                            name="select-category"
                        >
                            {categories.map((cat) => (
                                <option
                                    className="text-[#44444E] "
                                    key={cat._id}
                                    value={cat._id}
                                >
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {/*<div className="w-full flex justify-end border items-center">*/}
                        <div className="w-full grid grid-cols-1 place-content-end place-items-end">
                            {isLoading ? (
                                <button
                                    onClick={addSubCategories}
                                    className="p-2 border flex gap-2 focus:outline-red-500 w-fit justify-center items-center h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A] text-white text-xl rounded-lg"
                                >
                                    Adding...
                                    <Spin />
                                </button>
                            ) : (
                                <button
                                    onClick={addSubCategories}
                                    className="p-2 border focus:outline-red-500 w-40 h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A] text-white text-xl rounded-lg"
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    </div>
                }
                isTrue={showModal}
                isShowModalHandler={isShowModalHandler}
                isHideModalHandler={isHideModalHandler}
            />
        </div>
    )
}

export default SubCategory
