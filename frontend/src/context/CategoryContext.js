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

	const [imageFile, setImageFile] = useState(null)
	const [imageUrl, setImageUrl] = useState('')
	const [imageFileShow, setImageFileShow] = useState(null)

	const [deleteLoader, setDeleteLoader] = useState(false)
	const [editLoader, setEditLoader] = useState(false)
	const [addLoader, setAddLoader] = useState(false)

	const handleFileChange = (e) => {
		setImageFile(e.target.files[0])
		if (e.target.files[0]) {
			setImageFileShow(URL.createObjectURL(e.target.files[0]))
		}

		console.log('image selected', imageFileShow)
	}

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
	const [error, setError] = useState('')

	// GET category
	// useEffect(() => {
	// 	setIsLoader(true)
	// 	setTimeout(() => {
	// 		try {

	// 		}
	// 		const fetchCatgories = async () => {
	// 			const productCategory = await fetch(
	// 				'http://localhost:4000/categories',
	// 				{
	// 					method: 'get',
	// 					credentials: 'include',
	// 				},
	// 			)

	// 			if (!productCategory.ok) {
	// 				throw new Error("Server Error")
	// 			}

	// 			const categoryData = await productCategory.json()
	// 			setIsLoader(false)
	// 			setCategories(categoryData.categoriesData)
	// 			// console.log('filter product', product)
	// 			// console.log("category products", product);
	// 			console.log('categorydata', categoryData.categoriesData)
	// 		}

	// 		fetchCatgories()
	// 	}, 1000)
	// }, [])

	useEffect(() => {
		setIsLoader(true)

		const fetchCategories = async () => {
			try {
				const res = await fetch('http://localhost:4000/categries', {
					method: 'GET',
					credentials: 'include',
				})

				if (!res.ok) {
					throw new Error('Server Error')
				}

				const data = await res.json()
				setCategories(data.categoriesData)
			} catch (err) {
				console.error('Fetch error:', err.message)
				setError('Something went wrong. Please try again later.')
			} finally {
				setIsLoader(false) // always stop loader
			}
		}

		const timer = setTimeout(fetchCategories, 1000)

		return () => clearTimeout(timer)
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
	const addCategories = async () => {
		const imageData = new FormData()
		imageData.append('file', imageFile)
		imageData.append('upload_preset', 'images')

		const res = await fetch(
			'https://api.cloudinary.com/v1_1/dtiasevyl/image/upload',
			{
				method: 'POST',
				body: imageData,
			},
		)

		const cloudData = await res.json()
		console.log('Cloudinary URL:', cloudData.secure_url)
		setImageUrl(cloudData.secure_url)

		setAddLoader(true)
		fetch('http://localhost:4000/categories', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: category,
				image: cloudData.secure_url,
			}),
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
						setAddLoader(false)
						// setCategories([...categories, category])
						window.location.reload()
						// setCategories((prevCategory) => [
						// 	...prevCategory,
						// 	newCategory,
						// ])
					})
			})
	}

	// UPDATE Category
	const editOneCategory = async (id) => {
		const imageData = new FormData()
		imageData.append('file', imageFile)
		imageData.append('upload_preset', 'images')
		setEditLoader(true)

		const res = await fetch(
			'https://api.cloudinary.com/v1_1/dtiasevyl/image/upload',
			{
				method: 'POST',
				body: imageData,
			},
		)

		const cloudData = await res.json()
		console.log('Cloudinary URL:', cloudData.secure_url)
		setImageUrl(cloudData.secure_url)

		// setIsLoading(true)
		setCategoryId(id)
		console.log('edit category id', id)
		fetch(`http://localhost:4000/categories/${id}`, {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: editCategory,
				image: cloudData.secure_url,
			}),
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
						// setIsLoading(false)
						setEditLoader(false)
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
		setLoader(true)
		setTimeout(() => {
			fetch(`http://localhost:4000/categories/${id}`, {
				method: 'get',
				credentials: 'include',
			})
				.then((res) => res.json())
				.then((product) => {
					setLoader(false)
					setCategoryId(id)
					setEditCategory(product?.getOneCategory?.name)
					console.log('category my id', id)
					console.log('category name', product.getOneCategory?.name)
				})
		}, 1000)
	}

	// Delete Category
	const deleteCategory = (id) => {
		// setLoader(true)
		setDeleteLoader(true)
		setCategoryId(id)
		fetch(`http://localhost:4000/categories/${id}`, {
			method: 'delete',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then(() => {
				// setLoader(false)
				console.log('category delete buttn id', id)
				setTimeout(() => {
					window.location.reload()
				}, 1000)

				setDeleteLoader(false)
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
		// setLoader(true)
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
				handleFileChange,
				deleteLoader,
				setDeleteLoader,
				editLoader,
				setEditLoader,
				addLoader,
				setAddLoader,
				error,
			}}
		>
			{children}
		</CategoryContext.Provider>
	)
}
