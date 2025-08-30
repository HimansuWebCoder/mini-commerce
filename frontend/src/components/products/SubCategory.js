import { useState, useEffect, useContext } from 'react'
import Skeleton from '@mui/material/Skeleton'
import Modal from '../ui/Modal'
import { IoAddSharp } from 'react-icons/io5'
import { Spin } from 'antd'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoChevronBackOutline } from 'react-icons/io5'

import { Link, useParams, Outlet, useLocation, useNavigate } from 'react-router'

import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'

import { CategoryContext } from '../../context/CategoryContext'
import { SubCategoryContext } from '../../context/SubCategoryContext'

function SubCategory() {
    const navigate = useNavigate()
    const {
        categories,
        addCategories,
        category: productCategory,
        setCategory: setProductCategory,
        isLoader: isCategoryLoader,
        setIsLoader: setIsCategoryLoader,
        loader,
        setLoader,
        isLoading: isCategoryLoading,
        setIsLoading: setIsCategoryLoading,
        deletePopupAlertMsg,
        setIsDeletePopupAlertMsg,
        deletePopupAlert,
        setDeletePopupAlert,
        deleteCategory,
        categoryId: productCategoryId,
        setCategoryId: setProductCategoryId,
        showDeleteCategoryPopupHandler,
        showDeleteModal,
        setDeleteShowModal,
        isShowDeleteModalHandler,
        editCategory,
        setEditCategory,
        showEditCategoryPopupHandler,
        showEditModalHandler,
        showModal: categoryShowModal,
        setShowModal: setCategoryShowModal,
        editOneCategory,
        showEditModal,
        setShowEditModal,
        hideEditModalHandler,
        getOneCategory,
    } = useContext(CategoryContext)

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
        isLoading: isLoadingSubCategory,
        setIsLoading,
        oneSubCategoryId,
        showDeleteSubCategoryPopupHandler,
        deleteSubCategory,
        showSubCategoryDeleteModal,
        isHideSubCategoryDeleteModalHandler,
        isShowSubCategoryDeleteModalHandler,
        editOneSubCategory,
        editSubCategory,
        setEditSubCategory,
        showEditSubCategoryModal,
        showEditSubCategoryModalHandler,
        hideEditSubCategoryModalHandler,
        handleFileChange,
    } = useContext(SubCategoryContext)

    const [showModal, setShowModal] = useState(false)

    function setCategoryId(e) {
        setProductCategoryId(e.target.value)
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
        <div className=" w-full h-full place-content-start place-items-start gap-4 py-4 grid grid-cols-1">
            <Outlet />
            <div className="grid grid-cols-1 w-full h-full  p-4 gap-4 place-content-center place-items-center">
                <div className="font-poppins text-2xl  border-b text-[#44444E] w-full flex justify-between items-center py-2">
                    <h1 className="font-poppins text-3xl text-[#44444E] flex justify-start font-medium">
                        Explore by SubCategories
                    </h1>

                    <div className="flex gap-2 items-center justify-end">
                        <button
                            onClick={isShowModalHandler}
                            className="flex items-center text-xl font-opensans gap-2 bg-[#EFEEEA] hover:bg-gray-200 text-[#273F4F] font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            <IoAddSharp size="20" className="" />
                            Add Subcategory
                        </button>
                    </div>
                </div>
                {/* Subcategory Item Add Button Start*/}
                <div className="flex gap-2 items-center justify-between w-full ">
                    <div className=" flex gap-4">
                        {/* <div>
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
                            to="/category"
                            className="text-gray-600 font-medium font-poppins"
                        >
                            Category
                        </Link>
                    </div>
                    <div>/</div>
                    <div>
                        <Link
                            to="/subcategory"
                            className="text-gray-600 font-medium font-poppins"
                        >
                            Subcategory
                        </Link>
                    </div>*/}
                        <button
                            className="flex justify-center items-center p-2 rounded-lg font-poppins font-medium cursor-pointer hover:bg-gray-100 text-[#44444E]"
                            onClick={() => navigate(-1)}
                        >
                            <IoChevronBackOutline size="20" />
                            Back
                        </button>
                    </div>
                </div>
                {/* Subcategory Item Add Button End*/}

                {isLoader ? (
                    <div className="flex gap-2 flex-wrap">
                        <Skeleton variant="rounded" width={180} height={180} />
                        <Skeleton variant="rounded" width={180} height={180} />
                        <Skeleton variant="rounded" width={180} height={180} />
                        <Skeleton variant="rounded" width={180} height={180} />
                        <Skeleton variant="rounded" width={180} height={180} />
                        <Skeleton variant="rounded" width={180} height={180} />
                        <Skeleton variant="rounded" width={180} height={180} />
                    </div>
                ) : (
                    // <div className="w-full border p-2 flex justify-center items-center gap-4">
                    // <div className="w-full grid grid-cols-1">
                    //     <div className="grid grid-cols-4  p-2 gap-4 w-full">
                    //         {subCategories.map((subcategory) => (
                    //             <div
                    //                 key={subcategory._id}
                    //                 className="w-full flex justify-center items-center"
                    //             >
                    //                 <div
                    //                     onClick={() =>
                    //                         fetchOneSubCategory(subcategory._id)
                    //                     }
                    //                     className="cursor-pointer flex flex-col gap-2 justify-center items-center  focus:bg-[#EFEFEF] focus:border-0 rounded-lg w-full p-2 text-[#173B45] font-base hover:shadow-lg border"
                    //                 >
                    //                     <div className="max-w-40  h-40">
                    //                         {/*<Link
                    //                             to={`/subcategory/${subcategory._id}`}
                    //                         >*/}
                    //                         <img
                    //                             className="w-full h-full object-contain"
                    //                             src="/images/category.png"
                    //                             alt="shop"
                    //                         />
                    //                         {/*</Link>*/}
                    //                     </div>

                    //                     <h1 className="font-poppins  text-[#173B45] text-2xl font-normal">
                    //                         {subcategory.name}
                    //                     </h1>
                    //                 </div>
                    //             </div>
                    //         ))}
                    //     </div>

                    //     {/*<p className="text-7xl">{oneSubCategory.name}</p>*/}
                    // </div>

                    <div className="w-full grid grid-cols-2 sm:gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 md:gap-4 lg:gap-2">
                        {subCategories?.map((category) => (
                            <div
                                key={category._id}
                                className="w-40 h-40 flex justify-center items-center"
                            >
                                <div className="cursor-pointer relative flex flex-col gap-2 justify-center items-center  focus:bg-[#EFEFEF] focus:border-0 rounded-lg w-full p-2 text-[#173B45] font-base hover:shadow-lg border">
                                    <Link to={`/subcategory/${category._id}`}>
                                        <div className="w-20  h-20 rounded-full">
                                            <img
                                                className="w-full h-full rounded-full object-cover"
                                                // src="/images/category.png"
                                                src={category?.image}
                                                alt="shop"
                                            />
                                        </div>
                                    </Link>

                                    <button
                                        className="w-fit flex justify-center items-center h-fit absolute top-1 right-1 z-10 cursor-pointer text-white p-1 rounded-lg"
                                        onClick={() =>
                                            fetchOneSubCategory(category._id)
                                        }
                                    >
                                        <FaRegEdit
                                            size="20"
                                            className="text-black"
                                        />
                                    </button>

                                    <button
                                        className="w-fit flex justify-center items-center h-fit p-1 z-10 cursor-pointer rounded-lg text-white flex gap-2 absolute top-8 right-0 justify-center items-center font-medium"
                                        onClick={() =>
                                            showDeleteSubCategoryPopupHandler(
                                                category._id,
                                            )
                                        }
                                    >
                                        <MdDeleteOutline
                                            size="30"
                                            className="text-black"
                                        />
                                    </button>
                                    {/* edit one category modal start*/}
                                    <Modal
                                        isTrue={showEditSubCategoryModal}
                                        isShowModalHandler={
                                            showEditSubCategoryModalHandler
                                        }
                                        isHideModalHandler={
                                            hideEditSubCategoryModalHandler
                                        }
                                        child={
                                            <div className=" flex flex-col w-full  justify-center gap-2 items-start">
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="productCategory"
                                                >
                                                    Edit Subcategory
                                                </label>
                                                {isLoaderSkeleton ? (
                                                    <Skeleton
                                                        variant="rounded"
                                                        width={320}
                                                        height={40}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={editSubCategory}
                                                        onChange={(e) => {
                                                            const inputEditSubCategory =
                                                                e.target.value
                                                            const formattedEditSubCategoryInput =
                                                                inputEditSubCategory
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                inputEditSubCategory.slice(
                                                                    1,
                                                                )
                                                            setEditSubCategory(
                                                                formattedEditSubCategoryInput,
                                                            )
                                                        }}
                                                        placeholder="Product SubCategory"
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
                                                        {isLoadingSubCategory ? (
                                                            <button
                                                                onClick={() =>
                                                                    editOneSubCategory(
                                                                        oneSubCategoryId,
                                                                    )
                                                                }
                                                                className="p-2 border focus:outline-red-500 h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A] text-white text-xl rounded-lg"
                                                            >
                                                                Updating...
                                                                <Spin />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    editOneSubCategory(
                                                                        oneSubCategoryId,
                                                                    )
                                                                }
                                                                className="p-2 border focus:outline-red-500 h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A] text-white text-xl rounded-lg"
                                                            >
                                                                Update
                                                                {/*<Spin />*/}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        isHideModalHandler={isHideModalHandler}
                                        isShowModalHandler={isShowModalHandler}
                                    />
                                    {/* Edit one category modal end*/}

                                    <Modal
                                        isTrue={showSubCategoryDeleteModal}
                                        isHideModalHandler={
                                            isHideSubCategoryDeleteModalHandler
                                        }
                                        isShowModalHandler={
                                            isShowSubCategoryDeleteModalHandler
                                        }
                                        child={
                                            <div className=" w-full h-fit flex flex-col gap-2">
                                                {/*<div className="flex justify-between items-center gap-2">*/}
                                                <h1 className="font-poppins text-xl font-base">
                                                    Are you sure to delete the
                                                    subcategory ?
                                                </h1>
                                                {/*<MdClose size="30" className="text-black" />*/}
                                                {/*</div>*/}
                                                {/*<div className="w-full border h-fit flex  justify-end items-center gap-2">*/}
                                                <div className="w-full h-fit grid grid-cols-2 gap-2">
                                                    <button className="font-poppins text-xl border rounded-lg font-medium  h-fit p-2">
                                                        Cancel
                                                    </button>
                                                    {isLoadingSubCategory ? (
                                                        <button
                                                            className="font-poppins text-xl flex justify-center items-center gap-2 bg-red-500 rounded-lg text-white font-medium h-fit p-2"
                                                            onClick={() =>
                                                                deleteSubCategory(
                                                                    oneSubCategoryId,
                                                                )
                                                            }
                                                        >
                                                            Deleting... <Spin />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="font-poppins text-xl bg-red-500 rounded-lg text-white font-medium h-fit p-2"
                                                            onClick={() =>
                                                                deleteSubCategory(
                                                                    oneSubCategoryId,
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

                                    <Modal
                                        child={
                                            <div className="flex flex-col w-full justify-center gap-2 items-start">
                                                <label
                                                    className="font-inter text-xl text-red-400 font-medium"
                                                    htmlFor="productCategory"
                                                >
                                                    Add SubCategory
                                                </label>
                                                <input
                                                    type="text"
                                                    value={subCategory}
                                                    onChange={(e) => {
                                                        const inputAddSubCategory =
                                                            e.target.value
                                                        const formattedAddSubCategoryInput =
                                                            inputAddSubCategory
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                            inputAddSubCategory.slice(
                                                                1,
                                                            )
                                                        setSubCategory(
                                                            formattedAddSubCategoryInput,
                                                        )
                                                    }}
                                                    placeholder="Product SubCategory"
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
                                                    value={productCategoryId}
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
                                                    {isLoadingSubCategory ? (
                                                        <button
                                                            onClick={
                                                                addSubCategories
                                                            }
                                                            className="p-2 border flex gap-2 focus:outline-red-500 w-fit justify-center items-center h-fit font-medium font-poppins hover:text-gray-300  bg-gradient-to-r from-[#2C4E80] to-[#34699A] text-white text-xl rounded-lg"
                                                        >
                                                            Adding...
                                                            <Spin />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={
                                                                addSubCategories
                                                            }
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

                                    <h1 className="font-poppins  text-[#173B45] text-2xl font-normal">
                                        {category.name}
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SubCategory
