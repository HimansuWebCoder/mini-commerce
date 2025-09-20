import { createContext, useState, useEffect } from 'react'
import { CategoryContext } from './CategoryContext'

export const SubCategoryContext = createContext()

export const SubCategoryProvider = ({ children }) => {
	const [subCategories, setSubCategories] = useState([])
	const [subCategory, setSubCategory] = useState('')
	const [editSubCategory, setEditSubCategory] = useState('')
	const [category, setCategory] = useState(null)
	const [oneSubCategory, setOneSubCategory] = useState({})
	const [subCategoryProducts, setSubCategoryProducts] = useState([])
	const [isLoaderSkeleton, setIsLoaderSkeleton] = useState(false)
	const [isLoader, setIsLoader] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [subCategoryLoader, setSubCategoryLoader] = useState(false)

	const [subCategoryLoading, setSubCategoryLoading] = useState(false)

	const [oneSubCategories, setOneSubCategories] = useState([])
	const [oneSubCategoryId, setOneSubCategoryId] = useState(null)

	const [imageFile, setImageFile] = useState(null)
	const [imageUrl, setImageUrl] = useState('')
	const [imageFileShow, setImageFileShow] = useState(null)

	const handleFileChange = (e) => {
		setImageFile(e.target.files[0])
		if (e.target.files[0]) {
			setImageFileShow(URL.createObjectURL(e.target.files[0]))
		}

		console.log('image selected', imageFileShow)
	}

	const [showSubCategoryDeleteModal, setShowSubCategoryDeleteModal] =
		useState(false)
	const [showEditSubCategoryModal, setShowEditSubCategoryModal] =
		useState(false)

	const isHideSubCategoryDeleteModalHandler = () => {
		setShowSubCategoryDeleteModal(false)
	}

	const showEditSubCategoryModalHandler = () => {
		setShowEditSubCategoryModal(true)
	}

	const hideEditSubCategoryModalHandler = () => {
		setShowEditSubCategoryModal(false)
	}

	const isShowSubCategoryDeleteModalHandler = () => {
		setShowSubCategoryDeleteModal(true)
	}

	// Fetch sub categories
	useEffect(() => {
		// setIsLoader(true)
		setSubCategoryLoader(true)
		const fetchSubCatgories = async () => {
			const productSubCategory = await fetch(
				'http://localhost:4000/subcategories',
				{
					method: 'get',
					credentials: 'include',
				},
			)

			const subCategoryData = await productSubCategory.json()
			if (!subCategoryData.ok) {
				console.log(
					"can't load data you may be offline or network slow, please try again later",
				)
			}
			setSubCategoryLoader(false)
			// setIsLoader(false)
			setSubCategories(subCategoryData)
			console.log('subCategories', subCategoryData)
		}

		setTimeout(() => {
			fetchSubCatgories()
		}, 1000)
	}, [])

	// useEffect(() => {
	// 	fetch(`http://localhost:4000/categories/${oneSubCategoryId}`, {
	// 		method: 'get',
	// 		credentials: 'include',
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setOneSubCategories(data)
	// 		})
	// }, [oneSubCategoryId])

	// GET subcategory Id
	const showDeleteSubCategoryPopupHandler = (id) => {
		// setIsShowDeletePopup(true)
		// isShowDeleteModalHandler()
		// setIsShow(true)
		setShowSubCategoryDeleteModal(true)
		fetch(`http://localhost:4000/subcategories/${id}`, {
			method: 'get',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((product) => {
				// setLoader(false)
				setOneSubCategoryId(id)
				console.log('delete id subcategory', id)
			})
	}

	// Delete subCategory
	const deleteSubCategory = (id) => {
		// setLoader(true)
		// setSubCategoryId(id)
		setIsLoading(false)
		setOneSubCategoryId(id)
		fetch(`http://localhost:4000/subcategories/${id}`, {
			method: 'delete',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then(() => {
				setIsLoading(true)
				// setLoader(false)
				console.log('subcategory delete buttn id', id)
				setTimeout(() => {
					window.location.reload()
				}, 1000)

				// setDeletePopupAlert(true)
				// setIsDeletePopupAlertMsg('Product deleted Successfully')

				// setTimeout(() => {
				// 	setDeletePopupAlert(false)
				// }, 1000)
			})
	}

	// GET subcatories of one category
	const oneCategorySubCategory = (oneSubCategoryId) => {
		fetch(`http://localhost:4000/subcategories/${oneSubCategoryId}`, {
			method: 'get',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => {
				setOneSubCategories(data.oneSubCategory.products)
			})
	}

	// Post Sub-Categories
	const addSubCategories = async () => {
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

		setIsLoading(true)
		fetch('http://localhost:4000/subcategories', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: subCategory,
				category: category,
				image: cloudData.secure_url,
			}),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then(() => {
				fetch('http://localhost:4000/subcategories', {
					method: 'get',
					credentials: 'include',
				})
					.then((res) => res.json())
					.then((newSubCategories) => {
						setIsLoading(false)
						window.location.reload()
						setSubCategories(newSubCategories)
					})
			})
	}

	// Fetch one subcategory products
	const fetchOneSubCategory = (id) => {
		setIsLoaderSkeleton(true)
		setOneSubCategoryId(id)
		setShowEditSubCategoryModal(true)
		fetch(`http://localhost:4000/subcategories/${id}`, {
			method: 'get',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((subcategory) => {
				setIsLoaderSkeleton(false)
				setOneSubCategory(subcategory.oneSubCategory)
				setEditSubCategory(subcategory.oneSubCategory?.name)
				console.log('fetch one subcategory id', id)
				console.log(
					'fetch one subcategory name',
					subcategory.oneSubCategory?.name,
				)
				// console.log('one sub category name', subcategory.oneSubCategory)
				setSubCategoryProducts(subcategory.oneSubCategory.products)
				// window.location.reload();
			})
	}

	// Edit one subcategory

	const editOneSubCategory = async (id) => {
		// setIsLoaderSkeleton(true)

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

		setIsLoading(true)
		// setOneSubCategoryId(id)
		fetch(`http://localhost:4000/subcategories/${id}`, {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: editSubCategory,
				image: cloudData.secure_url,
			}),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then(() => {
				fetch('http://localhost:4000/subcategories', {
					method: 'get',
					credentials: 'include',
				})
					.then((res) => res.json())
					.then((newSubCategory) => {
						setIsLoading(false)
						// setCategories([...categories, category])
						setTimeout(() => {
							window.location.reload()
						}, 1000)
						console.log('edit sub category id', id)
						// setSubCategories((prevSubCategory) => [
						// 	...prevSubCategory,
						// 	newSubCategory,
						// ])
					})
			})
	}

	return (
		<SubCategoryContext.Provider
			value={{
				subCategories,
				addSubCategories,
				subCategory,
				setSubCategory,
				category,
				setCategory,
				deleteSubCategory,
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
				oneSubCategoryId,
				setOneSubCategoryId,
				oneSubCategories,
				oneCategorySubCategory,
				showDeleteSubCategoryPopupHandler,
				showSubCategoryDeleteModal,
				isHideSubCategoryDeleteModalHandler,
				isShowSubCategoryDeleteModalHandler,
				editOneSubCategory,
				editSubCategory,
				setEditSubCategory,
				showEditSubCategoryModal,
				setShowEditSubCategoryModal,
				showEditSubCategoryModalHandler,
				hideEditSubCategoryModalHandler,
				handleFileChange,
				subCategoryLoader,
				setSubCategoryLoader,
			}}
		>
			{children}
		</SubCategoryContext.Provider>
	)
}
