import { createContext, useState, useEffect } from 'react'

export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
	const [categories, setCategories] = useState([])
	const [category, setCategory] = useState('')
	const [isLoader, setIsLoader] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

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
						setCategories((prevCategory) => [
							...prevCategory,
							newCategory,
						])
					})
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
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</CategoryContext.Provider>
	)
}
