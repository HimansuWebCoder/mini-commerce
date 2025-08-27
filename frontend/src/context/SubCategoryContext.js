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
			}}
		>
			{children}
		</SubCategoryContext.Provider>
	)
}
