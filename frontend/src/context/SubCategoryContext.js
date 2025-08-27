import { createContext, useState, useEffect } from 'react'
import { CategoryContext } from './CategoryContext'

export const SubCategoryContext = createContext()

export const SubCategoryProvider = ({ children }) => {
	const [subCategories, setSubCategories] = useState([])
	const [subCategory, setSubCategory] = useState('')
	const [category, setCategory] = useState('')
	const [oneSubCategory, setOneSubCategory] = useState({})
	const [subCategoryProducts, setSubCategoryProducts] = useState([])
	const [isLoaderSkeleton, setIsLoaderSkeleton] = useState(false)
	const [isLoader, setIsLoader] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const [oneSubCategories, setOneSubCategories] = useState([])
	const [oneSubCategoryId, setOneSubCategoryId] = useState(null)

	// Fetch sub categories
	useEffect(() => {
		setIsLoader(true)
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
				setIsLoader(false)
				setSubCategories(subCategoryData)
				console.log('subCategories', subCategoryData)
			}

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

	useEffect(() => {
		fetch(`http://localhost:4000/subcategories/68ad7b27e6b791de19f2ec81`, {
			method: 'get',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => {
				setOneSubCategories(data.oneSubCategory.products)
			})
	}, [oneSubCategoryId])

	// Post Sub-Categories
	const addSubCategories = () => {
		setIsLoading(true)
		fetch('http://localhost:4000/subcategories', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: subCategory, category }),
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
						setSubCategories((prev) => [...prev, newSubCategories])
					})
			})
	}

	// Fetch one subcategory products
	const fetchOneSubCategory = (id) => {
		setIsLoaderSkeleton(true)
		fetch(`http://localhost:4000/subcategories/${id}`, {
			method: 'get',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((subcategory) => {
				setIsLoaderSkeleton(false)
				setOneSubCategory(subcategory.oneSubCategory)
				console.log('one sub category', subcategory.oneSubCategory)
				setSubCategoryProducts(subcategory.oneSubCategory.products)
				// window.location.reload();
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
				setOneSubCategoryId,
				oneSubCategories,
			}}
		>
			{children}
		</SubCategoryContext.Provider>
	)
}
