import { useState, useEffect } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router'

import { useNavigate, redirect } from 'react-router'

import { Outlet } from 'react-router'

import { Spin } from 'antd'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { IoAddSharp } from 'react-icons/io5'

import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

function AddProduct({ isShow, setIsShowModal }) {
    const [products, setProducts] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productCategory, setProductCategory] = useState(null)
    const [productSubCategory, setProductSubCategory] = useState(null)
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [productPrice, setProductPrice] = useState('')
    const [productOriginalPrice, setProductOriginalPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [productImg, setProductImg] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const [loader, setLoader] = useState(false)

    const [imageFile, setImageFile] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [imageFileShow, setImageFileShow] = useState(null)

    // const [ isShowModal, setIsShowModal ] = useState(false);
    const [showModalId, setIsShowModalId] = useState(null)
    const [isShowPopup, setIsShowPopup] = useState(false)

    const [isShowProducts, setIsShowProducts] = useState(false)
    const [isShowCategory, setIsShowCategory] = useState(false)

    function addProduct(e) {
        setProductName(e.target.value)
    }

    function addProductCategory(e) {
        setProductCategory(e.target.value)
        console.log('target value', e.target.value)
    }

    function addProductSubCategory(e) {
        setProductSubCategory(e.target.value)
        console.log('target value', e.target.value)
    }

    function addProductPrice(e) {
        setProductPrice(e.target.value)
    }

    function addProductImg(e) {
        if (e.target.value) {
            setProductImg(e.target.value)
        } else {
            setProductImg(
                'https://ecommerce-sand-beta-81.vercel.app/images/gamepad.png',
            )
        }
    }

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0])
        if (e.target.files[0]) {
            setImageFileShow(URL.createObjectURL(e.target.files[0]))
        }

        console.log('image selected', imageFileShow)
    }

    function isShowHandler(id) {
        setIsShowModalId(id)
    }

    function isHideHandler() {
        setIsShowModalId(null)
    }

    function isShowModalHandler() {
        setIsShowModal(true)
    }

    function isHideModalHandler() {
        setIsShowModal(false)
        setImageFileShow('')
        navigate(0)
        // window.location.reload()
    }

    // Post Categories

    function addCategories() {
        fetch('http://localhost:4000/categories', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category }),
            credentials: 'include',
        })
            .then((res) => res.json())
            .then(() => {
                fetch('http://localhost:4000/categories', {
                    method: 'get',
                    credentials: 'include',
                })
                    .then((res) => res.json())
                    .then((newProducts) => {
                        setCategories([...categories, category])
                    })
            })
    }

    // add products
    async function addProducts() {
        setLoader(true)
        const data = new FormData()
        data.append('file', imageFile)
        data.append('upload_preset', 'images')

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dtiasevyl/image/upload',
            {
                method: 'POST',
                body: data,
            },
        )

        const cloudData = await res.json()
        console.log('Cloudinary URL:', cloudData.secure_url)
        setImageUrl(cloudData.secure_url)

        fetch('http://localhost:4000/products', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productName,
                category: productCategory,
                subcategory: productSubCategory,
                productOriginalPrice,
                discount,
                productImg: cloudData.secure_url,
                productPrice,
                productDescription,
            }),
            credentials: 'include',
        })
            .then((res) => res.json())
            .then(() => {
                fetch('http://localhost:4000/products', {
                    method: 'get',
                    credentials: 'include',
                })
                    .then((res) => res.json())
                    .then((newProducts) => {
                        setProducts(newProducts)
                        setProductName('')
                        // window.location.reload();
                        setProductCategory('')
                        setProductPrice('')
                        setProductImg('')
                        setImageFileShow('')
                        setProductDescription('')
                        setProductOriginalPrice('')
                        setDiscount('')
                        setLoader(false)
                        // isHideModalHandler();
                        // setIsShowModal(false);
                        isHideModalHandler()
                    })
            })
    }

    // Fetch categories
    useEffect(() => {
        // setIsLoader(true);
        setTimeout(() => {
            const fetchCatgories = async () => {
                const productCategory = await fetch(
                    'http://localhost:4000/categories',
                    {
                        method: 'get',
                        credentials: 'include',
                    },
                )

                const categoryData = await productCategory.json()
                // setIsLoader(false)
                setCategories(categoryData.categoriesData)
                // console.log("category products", product);
                console.log('categorydata', categoryData.categoriesData)
            }

            fetchCatgories()
        }, 1000)
    }, [])

    // Fetch sub categories
    useEffect(() => {
        // setIsLoader(true);
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
                // setIsLoader(false)
                setSubCategories(subCategoryData)
                console.log('subCategories', subCategoryData)
            }

            fetchSubCatgories()
        }, 1000)
    }, [])

    return (
        <div>
            <div
                style={{ backgroundImage: `url("./images/bg.png")` }}
                className="fixed top-0 flex justify-center items-center backdrop-filter backdrop-blur-[2px] left-0 z-20 w-full h-screen"
            >
                <div className="w-full h-fit">
                    <div className="max-w-[40rem] m-auto p-4 rounded-2xl grid grid-cols-2 relative gap-4  bg-white shadow-2xl">
                        <div
                            onClick={() => setIsShowModal(isShow)}
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
                                className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
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
                                className="bg-gray-100 text-black border h-full text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
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
                                placeholder="₹"
                                className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
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
                                placeholder="₹"
                                className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
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
                                placeholder="₹"
                                className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                                id="discount"
                            />
                        </div>
                        {/*<div className=" flex flex-col w-full  justify-center gap-2 items-start">
                         <label className="font-inter text-xl text-red-400 font-medium" htmlFor="productCategory">Category</label>
                         <input 
                         type="text"
                         value={productCategory}
                         onChange={addProductCategory}
                         placeholder="Product Category"
                         className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                         id="productCategory" />
                    </div>*/}

                        <div className="flex flex-col w-full h-fit  justify-center gap-2 items-start">
                            <label
                                className="font-inter text-xl text-red-400 font-medium"
                                htmlFor="select-category"
                            >
                                Categories
                            </label>
                            <select
                                className="w-full rounded-lg h-fit p-2 focus:outline-red-400"
                                onChange={addProductCategory}
                                value={productCategory}
                                id="select-category"
                                name="select-category"
                            >
                                {categories.map((category) => (
                                    <option value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {/* <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                         <label className="font-inter text-xl text-red-400 font-medium" htmlFor="productCategory">Add New Category</label>
                         <input 
                         type="text"
                         value={category}
                         onChange={(e) => setCategory(e.target.value)}
                         placeholder="Product Category"
                         className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                         id="productCategory" />
                       </div>*/}
                            <div className="flex flex-col w-full h-fit  justify-center gap-2 items-start">
                                <label
                                    className="font-inter text-xl text-red-400 font-medium"
                                    htmlFor="select-category"
                                >
                                    Sub Category
                                </label>
                                <select
                                    className="w-full rounded-lg h-fit p-2 focus:outline-red-400"
                                    onChange={addProductSubCategory}
                                    value={productSubCategory}
                                    id="select-category"
                                    name="select-category"
                                >
                                    {subCategories.map((subcategory) => (
                                        <option value={subcategory._id}>
                                            {subcategory.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                                id="productimg"
                            />

                            {imageFileShow ? (
                                <img
                                    src={imageFileShow}
                                    alt=""
                                    className="w-8 h-8 bg-white border-white outline-white"
                                />
                            ) : null}
                        </div>

                        <button
                            className="p-2 border focus:outline-red-500 w-full h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A]  mt-9 text-white text-xl rounded-lg"
                            onClick={addProducts}
                        >
                            {loader ? (
                                <span className="block flex justify-center items-center gap-2">
                                    Adding your product...
                                    <Spin className="" />
                                </span>
                            ) : (
                                <span className="">Add product</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
