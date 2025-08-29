import { useState, useEffect, useContext } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { Link, useParams, Outlet, useLocation } from 'react-router'
import { IoAddSharp } from 'react-icons/io5'
import Modal from '../ui/Modal'
import { Spin } from 'antd'

import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'

import { CategoryContext } from '../../context/CategoryContext'
import { SubCategoryContext } from '../../context/SubCategoryContext'

function OneCategory() {
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
	} = useContext(SubCategoryContext)

	const [oneCategory, setOneCategory] = useState([])
	const location = useLocation()
	// const { id } = location.pathname.split('/')[2]
	const { categoryId } = useParams()
	// console.log('location', location.pathname.split('/')[2])

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

	function isHideDeleteModalHandler() {
		setDeleteShowModal(false)
	}

	// GET one Category
	useEffect(() => {
		// setIsLoaderSkeleton(true)
		fetch(`http://localhost:4000/categories/${categoryId}`, {
			method: 'get',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((categoryData) => {
				// setIsLoaderSkeleton(false)
				setOneCategory(categoryData.getOneCategory.subcategories)
				console.log(
					'one sub category',
					categoryData.getOneCategory.subcategories,
				)
				// setSubCategoryProducts(subcategory.oneSubCategory.products)
				// window.location.reload();
			})
	}, [categoryId])

	// const { oneCategory } = useContext(CategoryContext)

	return (
		<div className="grid grid-cols-1 gap-4  w-full p-4">
			<div className="w-full flex justify-between gap-2">
				<div className="flex gap-2">
					<Link
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
					</Link>
					<div>/</div>
					<Link
						to={`/category/${categoryId}`}
						className="text-gray-600 font-medium font-poppins"
					>
						subcategory
					</Link>
				</div>

				<button
					onClick={isShowModalHandler}
					className="flex font-base rounded-lg bg-[#EFEFEF] p-2 hover:text-white hover:bg-[#273F4F] font-poppins text-xl text-[#44444E] justify-center items-center"
				>
					<IoAddSharp size="20" className="" />
					Add Subcategory
				</button>
			</div>

			<div className="w-full grid grid-cols-1">
				<div className="grid md:grid-cols-4 grid-cols-2  p-2 gap-4 w-full">
					{oneCategory.map((category) => (
						<div
							key={category._id}
							className="w-full flex justify-center items-center"
						>
							<div className="cursor-pointer relative flex flex-col gap-2 justify-center items-center  focus:bg-[#EFEFEF] focus:border-0 rounded-lg w-full p-2 text-[#173B45] font-base hover:shadow-lg border">
								<div className="max-w-40  h-40">
									<Link to={`/subcategory/${category._id}`}>
										<img
											className="w-full h-full object-contain"
											src="/images/category.png"
											alt="shop"
										/>
									</Link>
								</div>

								<button
									className="w-fit flex justify-center items-center h-fit absolute top-4 right-2 z-10 cursor-pointer text-white p-1 rounded-lg"
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
									className="w-fit flex justify-center items-center h-fit p-1 z-10 cursor-pointer rounded-lg text-white flex gap-2 absolute top-10 right-1 justify-center items-center font-medium"
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
											<input
												type="text"
												value={editSubCategory}
												onChange={(e) =>
													setEditSubCategory(
														e.target.value,
													)
												}
												placeholder="Product Category"
												className="bg-gray-100 text-black border text-gray-400 focus:outline-red-300 w-full text-sm font-poppins rounded-lg p-2"
												id="productCategory"
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

								<h1 className="font-poppins  text-[#173B45] text-2xl font-normal">
									{category.name}
								</h1>
							</div>
						</div>
					))}
				</div>

				{/*<p className="text-7xl">{oneSubCategory.name}</p>*/}
			</div>
			{/* Subcategory modal start here*/}
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
							<option value="" defaultValue>
								Select your category
							</option>
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
			{/* Subcategory modal end here*/}
		</div>
	)
}

export default OneCategory

// {isLoaderSkeleton ? (
// 			<div className="flex gap-4 w-full border">
// 				<Skeleton variant="rounded" width={400} height={200} />
// 				{/*<Skeleton variant="rounded" width={320} height={400} />*/}
// 				{/*<Skeleton variant="rounded" width={320} height={400} />*/}
// 			</div>
// 		) : (
