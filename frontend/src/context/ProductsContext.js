import { createContext, useState, useEffect } from 'react'
import { CategoryContext } from './CategoryContext'

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([])

	// Edit product States
	const [editProductName, setEditProductName] = useState('')
	const [editProductCategory, setEditProductCategory] = useState('')
	const [editProductDescription, setEditProductDescription] = useState('')
	const [editProductOriginalPrice, setEditProductOriginalPrice] = useState('')
	const [editDiscount, setEditDiscount] = useState('')
	const [editProductPrice, setEditProductPrice] = useState('')
	const [editProductImg, setEditProductImg] = useState('')

	const [imageFile, setImageFile] = useState(null)
	const [imageUrl, setImageUrl] = useState('')
	const [imageFileShow, setImageFileShow] = useState(null)

	const [showModalId, setIsShowModalId] = useState(null)

	// Loaders states
	const [isLoading, setIsLoading] = useState(false)
	const [loader, setLoader] = useState(false)

	const isHideHandler = () => {
		setIsShowModalId(null)
		setImageFileShow('')
	}

	// Fetch products
	useEffect(() => {
		setIsLoading(true)

		const fetchProducts = async () => {
			try {
				const products = await fetch('http://localhost:4000/products', {
					method: 'get',
					credentials: 'include',
				})

				const productsData = await products.json()
				setIsLoading(false)
				setProducts(productsData.newProducts)
				// console.log(
				//     'category name',
				//     productsData.newProducts[0].category.name,
				// )
			} catch (err) {
				console.error('Error fetching products:', err)
			}
		}

		fetchProducts()
	}, [])

	// Edit Products
	const editProduct = async (id) => {
		setLoader(true)
		const data = new FormData()
		data.append('file', imageFile)
		data.append('upload_preset', 'images')

		const res = await fetch(
			'https://api.cloudinary.com/v1_1/dtiasevyl/image/upload',
			{
				method: 'POST',
				body: data,
			},
		)

		const cloudData = await res.json()
		// console.log("Cloudinary URL:", cloudData.secure_url);
		setImageUrl(cloudData.secure_url)

		fetch(`http://localhost:4000/products/${id}`, {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				productName: editProductName,
				productCategory: editProductCategory,
				productImg: cloudData.secure_url,
				productPrice: editProductPrice,
				productOriginalPrice: editProductOriginalPrice,
				discount: editDiscount,
				productDescription: editProductDescription,
			}),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then(() => {
				fetch('http://localhost:4000/products', {
					method: 'get',
					credentials: 'include',
				})
					.then((res) => res.json())
					.then((data) => {
						setProducts(data.newProducts)
						setLoader(false)
						window.location.reload()
						setEditProductName('')
						setEditProductCategory('')
						setEditProductPrice('')
						setEditProductImg('')
						setEditProductDescription('')
						setEditProductOriginalPrice('')
						setEditDiscount('')
						setImageFile('')
						isHideHandler()
					})
			})
	}

	return (
		<ProductsContext.Provider
			value={{
				products,
				setProducts,
				editProductName,
				setEditProductName,
				editProductCategory,
				setEditProductCategory,
				editProductDescription,
				setEditProductDescription,
				editProductOriginalPrice,
				setEditProductOriginalPrice,
				editDiscount,
				setEditDiscount,
				editProductPrice,
				setEditProductPrice,
				editProductImg,
				setEditProductImg,
				isLoading,
				setIsLoading,
				loader,
				setLoader,
				imageFile,
				setImageFile,
				imageUrl,
				setImageUrl,
				imageFileShow,
				setImageFileShow,
				showModalId,
				setIsShowModalId,
				isHideHandler,
				editProduct,
			}}
		>
			{children}
		</ProductsContext.Provider>
	)
}
