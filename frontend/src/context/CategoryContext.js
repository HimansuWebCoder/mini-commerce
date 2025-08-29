import { createContext, useState, useEffect } from 'react'

export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
	const [categories, setCategories] = useState([])
	const [oneCategory, setOneCategory] = useState([])
	const [category, setCategory] = useState('')
	const [editCategory, setEditCategory] = useState('')
	const [deletePopupAlertMsg, setIsDeletePopupAlertMsg] = useState('')
	const [deletePopupAlert, setDeletePopupAlert] = useState(false)
	const [categoryId, setCategoryId] = useState(null)

	const [showModal, setShowModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [showDeleteModal, setDeleteShowModal] = useState(false)

	const isShowDeleteModalHandler = () => {
		setDeleteShowModal(true)
	}

	const showEditModalHandler = () => {
		setShowEditModal(true)
	}

	const hideEditModalHandler = () => {
		setShowEditModal(false)
	}

	// loaders
	const [isLoader, setIsLoader] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [loader, setLoader] = useState(false)

	// GET category
	useEffect(() => {
		setIsLoader(true)
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
				setIsLoader(false)
				setCategories(categoryData.categoriesData)
				// console.log('filter product', product)
				// console.log("category products", product);
				console.log('categorydata', categoryData.categoriesData)
			}

			fetchCatgories()
		}, 1000)
	}, [])

	// GET one Category
	const getOneCategory = (id) => {
		// setIsLoaderSkeleton(true)
		fetch(`http://localhost:4000/categories/${id}`, {
			method: 'get',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((categoryData) => {
				// setIsLoaderSkeleton(false)
				setOneCategory(categoryData.getOneCategory.subcategories)
				console.log('one sub category name', categoryData)
				// setSubCategoryProducts(subcategory.oneSubCategory.products)
				// window.location.reload();
			})
	}

	// DELETE one Category
	const deleteOneCategory = (id) => {
		// setIsLoaderSkeleton(true)
		fetch(`http://localhost:4000/categories/${id}`, {
			method: 'delete',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((deletedCategory) => {
				// setIsLoaderSkeleton(false)
				// window.location.reload();
				console.log(deletedCategory)
			})
	}

	// UPDATE one Category
	const updateOneCategory = (id) => {
		// setIsLoaderSkeleton(true)
		fetch(`http://localhost:4000/categories/${id}`, {
			method: 'put',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((categoryData) => {
				// setIsLoaderSkeleton(false)
				setOneCategory(categoryData.getOneCategory.subcategories)
				console.log('one sub category', categoryData)
				// setSubCategoryProducts(subcategory.oneSubCategory.products)
				// window.location.reload();
			})
	}

	// POST Category
	const addCategories = () => {
		setIsLoading(true)
		fetch('http://localhost:4000/categories', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: category }),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then(() => {
				fetch('http://localhost:4000/categories', {
					method: 'get',
					credentials: 'include',
				})
					.then((res) => res.json())
					.then((newCategory) => {
						setIsLoading(false)
						// setCategories([...categories, category])
						window.location.reload()
						setCategories((prevCategory) => [
							...prevCategory,
							newCategory,
						])
					})
			})
	}

	// UPDATE Category
	const editOneCategory = (id) => {
		setIsLoading(true)
		setCategoryId(id)
		console.log('edit category id', id)
		fetch(`http://localhost:4000/categories/${id}`, {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: editCategory }),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then(() => {
				fetch('http://localhost:4000/categories', {
					method: 'get',
					credentials: 'include',
				})
					.then((res) => res.json())
					.then((newCategory) => {
						setIsLoading(false)
						// setCategories([...categories, category])
						window.location.reload()
						// setCategories((prevCategory) => [
						// 	...prevCategory,
						// 	newCategory,
						// ])
					})
			})
	}

	const showEditCategoryPopupHandler = (id) => {
		// setIsShowDeletePopup(true)
		// showEditModalHandler()
		setShowEditModal(true)
		setCategoryId(id)
		// setIsShow(true)
		fetch(`http://localhost:4000/categories/${id}`, {
			method: 'get',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((product) => {
				setLoader(false)
				setCategoryId(id)
				console.log('category my id', id)
			})
	}

	// Delete Category
	const deleteCategory = (id) => {
		setLoader(true)
		setCategoryId(id)
		fetch(`http://localhost:4000/categories/${id}`, {
			method: 'delete',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then(() => {
				setLoader(false)
				console.log('category delete buttn id', id)
				setTimeout(() => {
					window.location.reload()
				}, 1000)

				setDeletePopupAlert(true)
				setIsDeletePopupAlertMsg('Product deleted Successfully')

				setTimeout(() => {
					setDeletePopupAlert(false)
				}, 1000)
			})
	}

	// GET category Id
	const showDeleteCategoryPopupHandler = (id) => {
		// setIsShowDeletePopup(true)
		isShowDeleteModalHandler()
		// setIsShow(true)
		fetch(`http://localhost:4000/categories/${id}`, {
			method: 'get',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((product) => {
				setLoader(false)
				setCategoryId(id)
				console.log('delete id category', id)
			})
	}

	return (
		<CategoryContext.Provider
			value={{
				categories,
				addCategories,
				category,
				setCategory,
				isLoader,
				setIsLoader,
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
				getOneCategory,
			}}
		>
			{children}
		</CategoryContext.Provider>
	)
}
