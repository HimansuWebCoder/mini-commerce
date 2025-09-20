import { Link } from 'react-router'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Skeleton from '@mui/material/Skeleton'
import Modal from '../ui/Modal'
import AddProductBtn from '../AddProductBtn'
import { Spin } from 'antd'
import DeletePopup from '../ui/DeletePopup'

import { CiCirclePlus } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { MdDeleteOutline } from 'react-icons/md'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext'
import { CategoryContext } from '../../context/CategoryContext'
import { SubCategoryContext } from '../../context/SubCategoryContext'

function ProductCardContainer(props) {
    const { categories } = useContext(CategoryContext)
    const { subCategories } = useContext(SubCategoryContext)
    const {
        products,
        setProducts,
        editProductName,
        setEditProductName,
        editProductCategory,
        setEditProductCategory,
        editProductSubCategory,
        setEditProductSubCategory,
        editProductDescription,
        setEditProductDescription,
        editProductOriginalPrice,
        setEditProductOriginalPrice,
        editDiscount,
        setEditDiscount,
        editProductPrice,
        setEditProductPrice,
        editProductImg,
        setEditProductImg,
        isLoading,
        setIsLoading,
        loader,
        setLoader,
        imageFile,
        setImageFile,
        imageUrl,
        setImageUrl,
        imageFileShow,
        setImageFileShow,
        editProduct,
        isHideHandler,
        productError,
    } = useContext(ProductsContext)

    const { loading = false } = props

    const [subCategory, setSubCategory] = useState('')
    const [showModalId, setIsShowModalId] = useState(null)
    const [showDeletePopup, setIsShowDeletePopup] = useState(false)
    const [deleteProductId, setDeleteProductId] = useState(null)
    const [isHideDeleteModal, setIsHideDeleteModal] = useState(true)

    const [isShow, setIsShow] = useState(false)
    const [isShowProductModal, setIsShowProductModal] = useState(true)
    const [showDelProductId, setShowDelProductId] = useState(null)

    const [showProductEditModal, setShowProductEditModal] = useState(false)

    function isHideModalHandler() {
        setIsShow(false)
    }

    function showProductModal() {
        setIsShowModalId(null)
        setIsShowProductModal(false)
    }

    useEffect(() => {
        console.log('important categories', categories)
    })
    function showDeletePopupHandler(id) {
        setIsShowDeletePopup(true)
        setShowDelProductId(id)
        setIsShow(true)
        fetch(`http://localhost:4000/products/${id}`, {
            method: 'get',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((product) => {
                setLoader(false)
                setDeleteProductId(id)
            })
    }

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0])
        if (e.target.files[0]) {
            setImageFileShow(URL.createObjectURL(e.target.files[0]))
        }
    }

    function isShowHandler(id) {
        setIsShowModalId(id)
        setIsShowProductModal(true)
        setShowProductEditModal(true)
        fetch(`http://localhost:4000/products/${id}`, {
            method: 'get',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((product) => {
                setLoader(false)
                setShowProductEditModal(false)
                setEditProductName(product.getProduct.productName)
                // console.log(product.getProduct.productName);
                setEditProductCategory(product.getProduct.productCategory)
                setEditProductPrice(product.getProduct.productPrice)
                setEditProductImg(product.getProduct.productImg)
                setEditProductDescription(product.getProduct.productDescription)
                setEditProductOriginalPrice(
                    product.getProduct.productOriginalPrice,
                )
                setEditDiscount(product.getProduct.discount)
                setImageFileShow(product.getProduct.productImg)
                setImageFile(product.getProduct.productImg)
            })
    }

    // Delete Products
    function deleteProduct(id) {
        setIsShowModalId(id)
        setLoader(true)
        fetch(`http://localhost:4000/products/${id}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then(() => {
                setLoader(false)
                // window.location.reload()
            })
    }

    return (
        <div className="grid grid-cols-1 place-content-center place-items-center md:place-items-end sm:grid-cols-2 md:grid-cols-1 px-4 gap-4 w-full">
            <div className="w-full flex justify-end">
                <AddProductBtn />
            </div>
            <div className="grid  grid-cols-2 place-content-center place-items-center md:place-items-start sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
                <p className="absolute top-0 m-auto z-10">{productError}</p>
                {products?.map((product) => (
                    <Card
                        key={product._id}
                        sx={{
                            maxWidth: 345,
                            height: '100%',
                            boxShadow: '1px 1px 1px 0.1px gray',
                        }}
                    >
                        <div className="grid grid-cols-1 relative rounded-lg">
                            {showModalId === product._id ? (
                                <div
                                    style={{
                                        backgroundImage: `url("./images/bg.png")`,
                                    }}
                                    className="fixed top-0 flex justify-center items-center backdrop-filter shadow-xl backdrop-blur-[2px] left-0 z-20 w-full h-screen"
                                >
                                    <div className="w-full h-fit">
                                        <div className="max-w-[40rem] m-auto p-4  rounded-2xl grid grid-cols-2 relative gap-4  bg-white shadow-2xl">
                                            <div
                                                onClick={showProductModal}
                                                className="absolute cursor-pointer top-2 right-2 p-1 rounded-full aspect-[1/1]"
                                            >
                                                <MdClose
                                                    size="30"
                                                    className=""
                                                />
                                            </div>
                                            <div className="flex flex-col w-full justify-center gap-2 items-start">
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="productname"
                                                >
                                                    Name
                                                </label>
                                                {showProductEditModal ? (
                                                    <Skeleton
                                                        variant="rounded"
                                                        width={300}
                                                        height={40}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={editProductName}
                                                        onChange={(e) => {
                                                            const inputProductName =
                                                                e.target.value
                                                            const formattedInputProductName =
                                                                inputProductName
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                inputProductName.slice(
                                                                    1,
                                                                )
                                                            setEditProductName(
                                                                formattedInputProductName,
                                                            )
                                                        }}
                                                        placeholder="Product Name"
                                                        className="bg-gray-50 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                                                        id="productname"
                                                    />
                                                )}
                                            </div>

                                            <div className="flex flex-col w-full justify-center gap-2 items-start">
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="productdescription"
                                                >
                                                    Description
                                                </label>
                                                {showProductEditModal ? (
                                                    <Skeleton
                                                        variant="rounded"
                                                        width={300}
                                                        height={40}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={
                                                            editProductDescription
                                                        }
                                                        onChange={(e) => {
                                                            const inputDescription =
                                                                e.target.value
                                                            const formattedInputDescription =
                                                                inputDescription
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                inputDescription.slice(
                                                                    1,
                                                                )
                                                            setEditProductDescription(
                                                                formattedInputDescription,
                                                            )
                                                        }}
                                                        placeholder="Product Description"
                                                        className="bg-gray-50 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                                                        id="productdescription"
                                                    />
                                                )}
                                            </div>

                                            <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="productprice"
                                                >
                                                    Price
                                                </label>
                                                {showProductEditModal ? (
                                                    <Skeleton
                                                        variant="rounded"
                                                        width={300}
                                                        height={40}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={editProductPrice}
                                                        onChange={(e) =>
                                                            setEditProductPrice(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Product Price"
                                                        className="bg-gray-50 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                                                        id="productprice"
                                                    />
                                                )}
                                            </div>
                                            <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="productOriginalprice"
                                                >
                                                    Original Price
                                                </label>
                                                {showProductEditModal ? (
                                                    <Skeleton
                                                        variant="rounded"
                                                        width={300}
                                                        height={40}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={
                                                            editProductOriginalPrice
                                                        }
                                                        onChange={(e) =>
                                                            setEditProductOriginalPrice(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Product Original Price"
                                                        className="bg-gray-100 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                                                        id="productOriginalprice"
                                                    />
                                                )}
                                            </div>
                                            <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="discount"
                                                >
                                                    Discount
                                                </label>
                                                {showProductEditModal ? (
                                                    <Skeleton
                                                        variant="rounded"
                                                        width={300}
                                                        height={40}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={editDiscount}
                                                        onChange={(e) =>
                                                            setEditDiscount(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Product Discount"
                                                        className="bg-gray-50  text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
                                                        id="discount"
                                                    />
                                                )}
                                            </div>

                                            <div className="flex flex-col w-full h-fit  justify-center gap-2 items-start">
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="select-category"
                                                >
                                                    Categories
                                                </label>
                                                {showProductEditModal ? (
                                                    <Skeleton
                                                        variant="rounded"
                                                        width={300}
                                                        height={40}
                                                    />
                                                ) : (
                                                    <select
                                                        className="w-full rounded-lg h-fit p-2 focus:outline-red-400"
                                                        onChange={(e) =>
                                                            setEditProductCategory(
                                                                e.target.value,
                                                            )
                                                        }
                                                        value={
                                                            editProductCategory
                                                        }
                                                        id="select-category"
                                                        name="select-category"
                                                        defaultValue={
                                                            product?.category
                                                                ?._id
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            defaultValue
                                                        >
                                                            Select Category
                                                        </option>
                                                        {categories?.map(
                                                            (category) => (
                                                                <option
                                                                    selected
                                                                    value={
                                                                        category?._id
                                                                    }
                                                                >
                                                                    {
                                                                        category?.name
                                                                    }
                                                                </option>
                                                            ),
                                                        )}

                                                        {/*<option
                                                        value={
                                                            product?.category
                                                                ?._id
                                                        }
                                                    >
                                                        {
                                                            product?.category
                                                                ?.name
                                                        }
                                                    </option>*/}
                                                    </select>
                                                )}

                                                <div className="flex flex-col w-full h-fit  justify-center gap-2 items-start">
                                                    <label
                                                        className="font-inter text-xl text-red-400 font-medium"
                                                        htmlFor="select-category"
                                                    >
                                                        Sub Category
                                                    </label>
                                                    {showProductEditModal ? (
                                                        <Skeleton
                                                            variant="rounded"
                                                            width={300}
                                                            height={40}
                                                        />
                                                    ) : (
                                                        <select
                                                            className="w-full rounded-lg h-fit p-2 focus:outline-red-400"
                                                            onChange={(e) =>
                                                                setEditProductSubCategory(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            value={
                                                                editProductSubCategory
                                                            }
                                                            id="select-category"
                                                            name="select-category"
                                                            defaultValue
                                                        >
                                                            <option
                                                                value=""
                                                                defaultValue={
                                                                    product
                                                                        ?.subcategory
                                                                        ?._id
                                                                }
                                                            >
                                                                Select
                                                                SubCategory
                                                            </option>
                                                            {subCategories?.map(
                                                                (
                                                                    subcategory,
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            subcategory?._id
                                                                        }
                                                                        value={
                                                                            subcategory?._id
                                                                        }
                                                                    >
                                                                        {
                                                                            subcategory?.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}

                                                            {/*<option
                                                            value={
                                                                product
                                                                    ?.subcategory
                                                                    ?._id
                                                            }
                                                        >
                                                            {
                                                                product
                                                                    ?.subcategory
                                                                    ?.name
                                                            }
                                                        </option>*/}
                                                        </select>
                                                    )}
                                                </div>
                                            </div>

                                            <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="productimg"
                                                >
                                                    Image
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    placeholder="Product Image"
                                                    className="bg-gray-50 text-black border text-gray-400 focus:outline-red-400 w-full text-sm font-poppins rounded-lg p-2"
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
                                            {/*<div className="flex flex-wrap gap-4 w-full mt-9 justify-end">*/}
                                            <div className="grid grid-cols-2 place-content-center place-items-center gap-2">
                                                {loader ? (
                                                    <button
                                                        className="border cursor-pointer bg-[#06923E] font-medium cursor-pointer justify-center items-center p-2 w-full rounded-lg flex gap-2 text-xl text-white"
                                                        onClick={() =>
                                                            editProduct(
                                                                product._id,
                                                            )
                                                        }
                                                    >
                                                        Saving... <Spin />
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="border cursor-pointer bg-[#06923E] font-medium cursor-pointer justify-center items-center p-2 w-full rounded-lg flex gap-2 text-xl text-white"
                                                        onClick={() =>
                                                            editProduct(
                                                                product._id,
                                                            )
                                                        }
                                                    >
                                                        Save
                                                    </button>
                                                )}

                                                <button
                                                    className="border cursor-pointer bg-red-600 w-full h-fit p-2 cursor-pointer rounded-lg text-white flex gap-2 justify-center items-center text-xl font-medium"
                                                    onClick={() => {
                                                        isHideHandler(
                                                            product._id,
                                                        )

                                                        setIsShowProductModal(
                                                            false,
                                                        )
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <button
                                        className="w-fit flex justify-center items-center h-fit absolute top-4 right-2 z-10 cursor-pointer text-white p-1 rounded-lg"
                                        onClick={() =>
                                            isShowHandler(product?._id)
                                        }
                                    >
                                        <FaRegEdit
                                            size="20"
                                            className="text-black"
                                        />
                                    </button>
                                    {/*<button
                                        className="w-fit flex justify-center items-center h-fit p-1 z-10 cursor-pointer rounded-lg text-white flex gap-2 absolute top-10 right-1 justify-center items-center font-medium"
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                    >*/}
                                    <button
                                        className="w-fit flex justify-center items-center h-fit p-1 z-10 cursor-pointer rounded-lg text-white flex gap-2 absolute top-10 right-1 justify-center items-center font-medium"
                                        onClick={() =>
                                            showDeletePopupHandler(product?._id)
                                        }
                                    >
                                        <MdDeleteOutline
                                            size="30"
                                            className="text-black"
                                        />
                                    </button>
                                    {showDeletePopup && (
                                        <DeletePopup
                                            message="Are you sure to delete the Item ?"
                                            id={showDelProductId}
                                            isShow={isShow}
                                            isHideModalHandler={
                                                isHideModalHandler
                                            }
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        {loading ? (
                            <Skeleton
                                sx={{ height: 290, width: 310 }}
                                animation="wave"
                                variant="rectangular"
                            />
                        ) : (
                            <div className="bg-[#f5f5f5] h-[12rem] p-6 w-full rounded-sm aspect-[1/1] relative">
                                <Link
                                    to={`/products/${product?._id}`}
                                    className=""
                                >
                                    <img
                                        className="w-full h-full object-contain"
                                        src={product?.productImg}
                                        alt="product image"
                                    />
                                </Link>
                            </div>
                        )}

                        <CardContent>
                            {loading ? (
                                <Skeleton
                                    animation="wave"
                                    variant="linear"
                                    width="100%"
                                    height={20}
                                />
                            ) : (
                                <div className="w-full text-left line-clamp-1">
                                    <h3 className="text-sm md:text-xl line-clamp-1 text-[#44444E] font-poppins ">
                                        {product?.productName}
                                    </h3>
                                </div>
                            )}
                        </CardContent>

                        <CardContent>
                            {loading ? (
                                <>
                                    <Skeleton animation="wave" height={60} />
                                    <Skeleton
                                        animation="wave"
                                        height={20}
                                        width="30%"
                                    />
                                    <Skeleton
                                        animation="wave"
                                        height={20}
                                        width="20%"
                                    />
                                </>
                            ) : (
                                <div className="flex w-full flex-col justify-between gap-2 items-start h-auto ">
                                    <div className="text-left line-clamp-3">
                                        <p className="text-gray-500 font-poppins">
                                            ₹{product?.productDescription}
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-center gap-2">
                                        <p className="text-[#db4444] font-poppins">
                                            ₹{product?.productPrice}
                                        </p>
                                        <h2 className="text-gray-400 md:text-xs line-through font-poppins">
                                            {product.productOriginalPrice}
                                        </h2>
                                        <h2 className="text-green-600 md:text-xs font-poppins">
                                            ₹{product?.discount} OFF
                                        </h2>
                                    </div>
                                    <div className="w-fit h-fit rounded-lg bg-gray-200 p-2">
                                        <p className="text-gray-600 font-roboto text-sm font-medium">
                                            {product?.subcategory?.name}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

ProductCardContainer.propTypes = {
    loading: PropTypes.bool,
}

function ProductCard() {
    // const { isLoading, setIsLoading, setProducts } = useContext(ProductsContext)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    // Fetch products
    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            const fetchProducts = async () => {
                try {
                    const products = await fetch(
                        'http://localhost:4000/products',
                        {
                            method: 'get',
                            credentials: 'include',
                        },
                    )

                    const productsData = await products.json()
                    setIsLoading(false)
                    setProducts(productsData.newProducts)
                    // console.log(
                    //     'category name',
                    //     productsData.newProducts[0].category.name,
                    // )
                } catch (err) {
                    console.error('Error fetching products:', err)
                }
            }

            fetchProducts()
        }, 3000)
    }, [])

    return (
        <div className="max-w-full">
            {isLoading ? (
                <ProductCardContainer loading />
            ) : (
                <ProductCardContainer />
            )}
        </div>
    )
}

export default ProductCard
