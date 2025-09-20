import { useState, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton'
import Modal from '../ui/Modal'
import SubCategory from './SubCategory'
import { Link, useNavigate } from 'react-router'
import { Spin } from 'antd'
import { Outlet } from 'react-router'

// icons
import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { MdOutlineCategory } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { IoAddSharp } from 'react-icons/io5'
import { IoChevronBackOutline } from 'react-icons/io5'

import { useContext } from 'react'
import { CategoryContext } from '../../context/CategoryContext'

function Category() {
    const navigate = useNavigate()
    const {
        categories,
        category,
        setCategory,
        addCategories,
        loader,
        setLoader,
        isLoading,
        setIsLoading,
        deletePopupAlertMsg,
        setIsDeletePopupAlertMsg,
        deletePopupAlert,
        setDeletePopupAlert,
        deleteCategory,
        categoryId,
        setCategoryId,
        showDeleteCategoryPopupHandler,
        showDeleteModal,
        setDeleteShowModal,
        isShowDeleteModalHandler,
        editCategory,
        setEditCategory,
        showEditCategoryPopupHandler,
        showEditModalHandler,
        showModal,
        setShowModal,
        editOneCategory,
        showEditModal,
        setShowEditModal,
        hideEditModalHandler,
        handleFileChange,
        deleteLoader,
        setDeleteLoader,
        editLoader,
        setEditLoader,
        addLoader,
        setAddLoader,
        error,
        isCategoryLoader,
        setIsCategoryLoader,
    } = useContext(CategoryContext)

    // const [products, setProducts] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [selectCategory, setSelectCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')

    // function setCategoryId(e) {
    //     setCategoryId(e.target.value)
    //     console.log('category id', e.target.value)
    // }
    // const [categoryId, setCategoryId] = useState(null)

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

    // const [showModal, setShowModal] = useState(false)

    function isShowModalHandler() {
        setShowModal(true)
    }

    function isHideAddCategoryModalHandler() {
        setShowModal(false)
    }

    function isHideModalHandler(e) {
        setShowEditModal(false)
        console.log(e.target)
    }

    function isHideDeleteModalHandler() {
        setDeleteShowModal(false)
    }

    return (
        <div className=" w-fit grid  py-4 grid-cols-1 gap-4 w-full h-full place-content-center place-items-center">
            <div className="grid grid-cols-1 w-full h-full  p-4 gap-4 place-content-center place-items-center">
                <div className="font-poppins text-2xl border-b text-[#44444E] w-full flex justify-between items-center py-2">
                    <h1 className="font-poppins text-3xl text-[#44444E] flex justify-start font-medium">
                        Explore by Categories
                    </h1>

                    <div className="flex gap-2 items-center justify-end">
                        <button
                            onClick={isShowModalHandler}
                            className="flex items-center text-xl font-opensans gap-2 bg-[#EFEEEA] hover:bg-gray-200 text-[#273F4F] font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            <IoAddSharp size="20" className="" />
                            Add category
                        </button>
                    </div>
                </div>

                <div className="w-full flex gap-2">
                    {/* <Link
                        to="/"
                        className="text-gray-600 font-medium font-poppins"
                    >
                        Home
                    </Link>
                    <div>/</div>
                    <Link
                        to="/products"
                        className="text-gray-600 font-medium font-poppins"
                    >
                        Products
                    </Link>
                    <div>/</div>
                    <Link
                        to="/category"
                        className="text-gray-600 font-medium font-poppins"
                    >
                        Category
                    </Link>*/}
                    <button
                        className="flex justify-center items-center p-2 rounded-lg font-poppins font-medium cursor-pointer hover:bg-gray-100 text-[#44444E]"
                        onClick={() => navigate(-1)}
                    >
                        <IoChevronBackOutline size="20" />
                        Back
                    </button>
                </div>

                <div className="flex w-full gap-4 items-center justify-start [&::-webkit-scrollbar]:hidden  overflow-x-auto">
                    {isCategoryLoader ? (
                        <>
                            {categories?.length > 0 &&
                                categories?.map((category) => (
                                    <div className="flex gap-2 flex-wrap">
                                        <Skeleton
                                            variant="rounded"
                                            width={180}
                                            height={180}
                                        />
                                    </div>
                                ))}
                        </>
                    ) : (
                        <div className="w-full relative h-full grid grid-cols-2 md:grid-cols-7 gap-4 p-4">
                            <p className="absolute top-0 m-auto z-10">
                                {error}
                            </p>
                            {categories?.map((category) => (
                                // <Link to={`/category/${category._id}`}>
                                <div
                                    className="flex relative w-40 h-40 rounded-lg justify-center  items-center"
                                    key={category._id}
                                >
                                    <div
                                        onClick={(e) =>
                                            setSelectCategory(category.category)
                                        }
                                        className="font-poppins justify-center focus:bg-[#73C7C7] items-center gap-2 flex-col flex cursor-pointer hover:shadow-lg  rounded-lg w-full h-full aspect-[1/1] p-2 font-normal border"
                                    >
                                        <div className="w-20  h-20 rounded-full">
                                            <img
                                                className="w-full h-full rounded-full object-cover"
                                                // src="/images/category.png"
                                                src={category?.image}
                                                alt="shop"
                                            />
                                        </div>
                                        <h1 className="font-poppins  text-[#173B45] text-2xl font-normal">
                                            {category.name}
                                        </h1>
                                    </div>
                                    <button
                                        className="w-fit flex justify-center items-center h-fit absolute top-4 right-2 z-10 cursor-pointer text-white p-1 rounded-lg"
                                        onClick={() =>
                                            showEditCategoryPopupHandler(
                                                category._id,
                                            )
                                        }
                                    >
                                        <FaRegEdit
                                            size="20"
                                            className="text-black"
                                        />
                                    </button>

                                    <button
                                        className="w-fit flex justify-center items-center h-fit p-1 z-10 cursor-pointer rounded-lg text-white flex gap-2 absolute top-10 right-1 justify-center items-center font-medium"
                                        onClick={() =>
                                            showDeleteCategoryPopupHandler(
                                                category._id,
                                            )
                                        }
                                    >
                                        <MdDeleteOutline
                                            size="30"
                                            className="text-black"
                                        />
                                    </button>
                                    {/* Edit category modal start*/}

                                    <Modal
                                        isTrue={showEditModal}
                                        isShowModalHandler={
                                            showEditModalHandler
                                        }
                                        isHideModalHandler={
                                            hideEditModalHandler
                                        }
                                        child={
                                            <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="productCategory"
                                                >
                                                    Edit Category
                                                </label>
                                                {loader ? (
                                                    <Skeleton
                                                        variant="rounded"
                                                        width={320}
                                                        height={40}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={editCategory}
                                                        onChange={(e) => {
                                                            const inputEditCategory =
                                                                e.target.value
                                                            const formattedEditCategoryInput =
                                                                inputEditCategory
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                inputEditCategory.slice(
                                                                    1,
                                                                )
                                                            setEditCategory(
                                                                formattedEditCategoryInput,
                                                            )
                                                        }}
                                                        placeholder="Product Category"
                                                        className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                                                        id="productCategory"
                                                    />
                                                )}
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="productCategory"
                                                >
                                                    Edit Image
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                                                    id="productimg"
                                                />
                                                {/*<div className="w-full border flex justify-end items-center">*/}
                                                <div className="w-full grid grid-cols-1 place-content-center place-items-end">
                                                    <div className="w-full grid grid-cols-2 gap-2">
                                                        <button
                                                            onClick={() =>
                                                                hideEditModalHandler()
                                                            }
                                                            className="p-2 border focus:outline-red-500 h-fit font-medium font-poppins hover:bg-gray-100 text-xl rounded-lg"
                                                        >
                                                            Cancel
                                                        </button>
                                                        {editLoader ? (
                                                            <button
                                                                onClick={() =>
                                                                    editOneCategory(
                                                                        categoryId,
                                                                    )
                                                                }
                                                                className="p-2 border focus:outline-red-500 h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A] text-white text-xl rounded-lg"
                                                            >
                                                                Updating...{' '}
                                                                <Spin />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    editOneCategory(
                                                                        categoryId,
                                                                    )
                                                                }
                                                                className="p-2 border focus:outline-red-500 h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A] text-white text-xl rounded-lg"
                                                            >
                                                                Update
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        isHideModalHandler={isHideModalHandler}
                                        isShowModalHandler={isShowModalHandler}
                                    />
                                    {/* Edit category modal end*/}

                                    <Modal
                                        isTrue={showDeleteModal}
                                        isHideModalHandler={
                                            isHideDeleteModalHandler
                                        }
                                        isShowModalHandler={
                                            isShowDeleteModalHandler
                                        }
                                        child={
                                            <div className=" w-full h-fit flex flex-col gap-2">
                                                {/*<div className="flex justify-between items-center gap-2">*/}
                                                <h1 className="font-poppins text-xl font-base">
                                                    Are you sure to delete the
                                                    category ?
                                                </h1>
                                                {/*<MdClose size="30" className="text-black" />*/}
                                                {/*</div>*/}
                                                {/*<div className="w-full border h-fit flex  justify-end items-center gap-2">*/}
                                                <div className="w-full h-fit grid grid-cols-2 gap-2">
                                                    <button className="font-poppins text-xl border rounded-lg font-medium  h-fit p-2">
                                                        Cancel
                                                    </button>
                                                    {deleteLoader ? (
                                                        <button
                                                            className="font-poppins text-xl flex justify-center items-center gap-2 bg-red-500 rounded-lg text-white font-medium h-fit p-2"
                                                            onClick={() =>
                                                                deleteCategory(
                                                                    category._id,
                                                                )
                                                            }
                                                        >
                                                            Deleting... <Spin />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="font-poppins text-xl bg-red-500 rounded-lg text-white font-medium h-fit p-2"
                                                            onClick={() =>
                                                                deleteCategory(
                                                                    categoryId,
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        }
                                    />
                                </div>
                                // </Link>
                            ))}
                        </div>
                    )}
                </div>

                <Modal
                    isTrue={showModal}
                    isShowModalHandler={isShowModalHandler}
                    isHideModalHandler={isHideAddCategoryModalHandler}
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
                                onChange={(e) => {
                                    const inputCategory = e.target.value
                                    const formattedCategoryInput =
                                        inputCategory.charAt(0).toUpperCase() +
                                        inputCategory.slice(1)
                                    setCategory(formattedCategoryInput)
                                }}
                                placeholder="Product Category"
                                className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                                id="productCategory"
                            />
                            <label
                                className="font-inter text-xl text-red-400 font-medium"
                                htmlFor="productCategory"
                            >
                                Add Image
                            </label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
                                id="productimg"
                            />
                            {/*<div className="w-full border flex justify-end items-center">*/}
                            <div className="w-full grid grid-cols-1 place-content-center place-items-end">
                                {addLoader ? (
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
                />
            </div>

            <Outlet />
        </div>
    )
}

export default Category
