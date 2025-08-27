import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router'
import { IoIosArrowDown } from 'react-icons/io'

import { CiCirclePlus } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { MdDeleteOutline } from 'react-icons/md'

// import PropTypes from 'prop-types';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton'

import { LuMinus } from 'react-icons/lu'
import { FaPlus } from 'react-icons/fa6'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

function GetOneProduct() {
    const [product, setProduct] = useState('')
    const { productId } = useParams()

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [isShowImg, setIsShowImg] = useState('')

    const [count, setCount] = useState(0)

    function counterIncrementHandler() {
        setCount(count + 1)
    }

    function counterDecreamentHandler() {
        setCount(count - 1)
    }

    function isShowImgHandler(e) {
        setIsShowImg(e.target)
        console.log(isShowImg)
        console.log(product)
        console.log(product.productImg)
        // console.log(e.target.src);
        console.log(e.target)
    }

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
                    console.log('all Products', productsData.newProducts)
                } catch (err) {
                    console.error('Error fetching products:', err)
                }
            }

            fetchProducts()
        }, 2000)
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/products/${productId}`, {
            method: 'get',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((productData) => {
                setProduct(productData.getProduct)
                console.log('name', productData.productName)
                console.log('product', productData.getProduct.productName)
                console.log('product details', productData.getProduct)
                console.log('products', productData)
            })
    }, [productId])

    return (
        <div className="max-w-full h-fit bg-[] grid grid-cols-1 gap-2 m-5">
            <div className="flex justify-between max-w-full items-center p-4">
                <div className="flex gap-2 md:text-base text-sm  max-w-full flex-wrap justify-center items-center">
                    <div>
                        <Link
                            to="/"
                            className="text-gray-600 font-medium font-poppins"
                        >
                            Home
                        </Link>
                    </div>
                    <div>/</div>
                    <div>
                        <Link
                            to="/products"
                            className="text-gray-600 font-medium font-poppins"
                        >
                            Products
                        </Link>
                    </div>
                    <div>/</div>
                    <div>
                        <Link
                            to={`/products/${productId}`}
                            className="text-gray-600 font-medium font-poppins"
                        >
                            Product Details
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-full h-fit bg-[] grid grid-cols-1 md:grid-cols-7  gap-2 m-5">
                {isLoading ? (
                    <>
                        <div className="flex gap-2 col-span-3">
                            <Skeleton
                                variant="wave"
                                width={1000}
                                height="500px"
                            />
                        </div>

                        <div className="flex col-span-4 flex-col">
                            <Skeleton
                                variant="wave"
                                width={70}
                                height={40}
                                sx={{ borderRadius: '8px' }}
                            />
                            <Skeleton
                                animation="wave"
                                width={300}
                                height={70}
                            />
                            <Skeleton
                                animation="wave"
                                width={250}
                                height={70}
                            />
                            <Skeleton
                                animation="wave"
                                width={650}
                                height={390}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="col-span-3 flex flex-col bg-[#F5F5F5] justify-center items-center p-4">
                            <div className="w-fit h-[20rem] aspect-[1/1] flex justify-center items-center">
                                <img
                                    className="w-full h-full object-contain rounded-lg"
                                    src={product.productImg}
                                    alt="product image"
                                />
                                {/* <img className="w-full h-full object-contain rounded-lg" src={isShowImg.src} alt="product image"/> */}
                            </div>
                            <div className="grid grid-cols-4 relative gap-4">
                                {product.productSubImg.map((img) => (
                                    <div
                                        onClick={isShowImgHandler}
                                        className="w-full h-fit bg-gray-200 aspect-[1/1] flex justify-center items-center"
                                    >
                                        <img
                                            className="w-full h-full object-contain rounded-lg"
                                            src={img}
                                            alt="product image"
                                        />
                                    </div>
                                ))}
                                {/* <div className="w-full h-fit bg-gray-200 aspect-[1/1] flex justify-center items-center">
                                   <img src={isShowImg.src} className="w-full h-full object-contain rounded-lg" />
                                </div> */}
                            </div>
                        </div>
                        {/* products details*/}
                        <div className="col-span-4 flex flex-col justify-start gap-2 p-4 items-start ">
                            {/*product category*/}
                            <div className="w-full h-fit text-left">
                                <div className="w-fit h-fit rounded-lg bg-gray-200 p-2">
                                    <h2 className="text-gray-600 font-roboto text-xl font-medium">
                                        {product.productCategory}
                                    </h2>
                                </div>
                            </div>

                            <div className="w-full text-left w-full h-fit ">
                                <h3 className="text-4xl text-[#44444E] font-bold font-poppins ">
                                    {product.productName}
                                </h3>
                            </div>

                            {/*product price*/}
                            <div className="w-full h-fit flex justify-start items-center gap-4 text-left">
                                <h2 className="text-gray-500 font-medium md:text-3xl font-poppins">
                                    ${product.productPrice}
                                </h2>
                                {/*<h2 className="w-10 h-auto md:h-8 md:w-14 md:text-sm text-xs  p-1 text-white bg-[#db4444] font-poppins rounded">600</h2>*/}
                                <h2 className="text-gray-400 md:text-2xl line-through font-poppins">
                                    {product.productOriginalPrice}
                                </h2>
                                <h2 className="text-green-600 md:text-2xl font-poppins">
                                    ${product.discount} OFF
                                </h2>
                            </div>
                            <h2 className="text-green-600 md:text-md font-medium font-poppins">
                                Inclusive of all taxes
                            </h2>
                            <hr className="border-1 border-gray-300 w-full" />

                            <div className="w-[14rem] border h-max place-content-center rounded-full grid grid-cols-3">
                                <button
                                    className="flex border-gray-600 rounded-full border justify-center items-center h-10"
                                    onClick={counterDecreamentHandler}
                                >
                                    <LuMinus />
                                </button>
                                <div className="flex rounded justify-center self-center text-center items-center h-max text-xl font-bold">
                                    <p className="text-center">{count}</p>
                                </div>
                                <button
                                    className="flex bg-[#db4444] rounded-full text-white justify-center items-center border-l-2 h-full"
                                    onClick={counterIncrementHandler}
                                >
                                    <FaPlus />
                                </button>
                            </div>

                            {/* Order Button*/}
                            <div className="w-full h-fit flex justify-start">
                                <button className=" w-[14rem] h-fit bg-[#DB4444] font-bold text-xl text-white p-2 rounded-lg">
                                    Buy Now
                                </button>
                            </div>
                            {/*product description*/}
                            <div className="w-full h-fit flex  gap-2 justify-start items-start flex-col text-left">
                                <h2 className="text-gray-600 text-xl font-medium font-poppins">
                                    Product Details
                                </h2>
                                <h2 className="text-gray-500 font-poppins">
                                    ${product.productDescription}
                                </h2>
                                {/*<IoIosArrowDown size="20" className="" />*/}
                            </div>

                            <div className="grid grid-cols-1 mt-8 border border-gray-400 rounded-md">
                                <div className="border-b-[0.007rem] text-[#44444E] border-gray-400 grid grid-cols-2 md:grid-cols-10 gap-1  p-4">
                                    <div className="w-10 h-10 col-span-1">
                                        <img
                                            className="w-full h-full object-contain"
                                            src="/images/delivery-man.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-span-9">
                                        <h3 className="font-poppins font-medium">
                                            Free Delivery
                                        </h3>
                                        <p className="font-poppins">
                                            Enter your postal code for Delivery
                                            Availability
                                        </p>
                                    </div>
                                </div>

                                <div className="border-[0.007rem] grid grid-cols-2 text-[#44444E] md:grid-cols-10 p-4">
                                    <div className="w-10 h-10 col-span-1">
                                        <img
                                            className="w-full h-full object-contain"
                                            src="/images/return-box.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-span-9">
                                        <h3 className="font-poppins font-medium">
                                            Return Delivery
                                        </h3>
                                        <p className="font-poppins">
                                            Free 30 Days Delivery Returns.
                                            Details
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* below fetch product details */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 m-auto p-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="grid grid-cols-1 gap-1 md:gap-3 p-4 relative rounded-lg shadow-lg"
                    >
                        <div className="">
                            <div className="bg-[#f5f5f5] w-full h-40 rounded-sm aspect-[1/1] relative p-8">
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
                                    {product.productCategory}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GetOneProduct
