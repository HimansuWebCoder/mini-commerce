import { useState, useContext, useEffect } from 'react'
import { SubCategoryContext } from '../../context/SubCategoryContext'
import Skeleton from '@mui/material/Skeleton'
import { Link, useParams, useNavigate } from 'react-router'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoChevronBackOutline } from 'react-icons/io5'
import Image from '../ui/Image'

function OneSubCategory() {
	const navigate = useNavigate()
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
		isLoading,
		setIsLoading,
		oneSubCategories,
		setOneSubCategoryId,
	} = useContext(SubCategoryContext)

	const { subcategoryId } = useParams()
	const [subCategoryProduct, setSubCategoryProduct] = useState([])
	const [isLoaderOneSkeleton, setIsLoaderOneSkeleton] = useState(true)

	useEffect(() => {
		console.log('product filter page subcategory')
		console.log(subcategoryId)
	})

	// Fetch one subcategory products

	useEffect(() => {
		setIsLoaderOneSkeleton(true)
		fetch(`http://localhost:4000/subcategories/${subcategoryId}`, {
			method: 'get',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((subcategory) => {
				setIsLoaderOneSkeleton(false)
				setSubCategoryProduct(subcategory?.oneSubCategory?.products)
				console.log('fetch one subcategory id', subcategoryId)
				console.log('one sub category name', subcategory.oneSubCategory)
				// setSubCategoryProducts(subcategory.oneSubCategory.products)
				// window.location.reload();
			})
	}, [subcategoryId])

	return (
		<div className="grid grid-cols-1 gap-4  p-4">
			<div className="flex gap-4">
				{/*<div>
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
						to={`/category`}
						className="text-gray-600 font-medium font-poppins"
					>
						Subcategory
					</Link>
				</div>
				<div>/</div>
				<div>
					<Link
						to={`/subcategory/${subcategoryId}`}
						className="text-gray-600 font-medium font-poppins"
					>
						Subcategory Products
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
			<div className="grid grid-cols-5 gap-4 w-full">
				{isLoaderOneSkeleton ? (
					<>
						{subCategoryProduct?.length &&
							subCategoryProduct?.map(() => (
								<Skeleton
									variant="rounded"
									width={250}
									height={320}
								/>
							))}
					</>
				) : (
					<div className=" max-w-full">
						{subCategoryProduct?.length > 0 ? (
							<div className=" w-[80rem] grid grid-cols-5 gap-4">
								{subCategoryProduct?.map((product) => (
									<div
										key={product?._id}
										className="grid grid-cols-1 gap-1 md:gap-3 p-4 relative rounded-lg border"
									>
										<div className="">
											<div className="bg-[#f5f5f5] w-full h-40 rounded-sm aspect-[1/1] relative p-4">
												<Link
													to={`/products/${product?._id}`}
													className=""
												>
													<img
														className="w-full h-full object-contain"
														src={
															product?.productImg
														}
														alt="product image"
													/>
												</Link>
											</div>
										</div>

										<div className="w-full text-left line-clamp-2">
											<h3 className="text-sm md:text-xl line-clamp-1 md:line-clamp-none text-[#44444E] font-medium font-poppins">
												{product?.productName}
											</h3>
										</div>
										<div className="flex w-full flex-col justify-between items-start h-auto">
											<div className="text-left line-clamp-3">
												<p className="text-gray-500 font-poppins tracking-widest">
													$
													{
														product?.productDescription
													}
												</p>
											</div>
											<div>
												<p className="text-[#db4444] font-poppins">
													${product?.productPrice}
												</p>
											</div>
											<div className="w-fit h-fit rounded-lg bg-gray-200 p-2">
												<p className="text-gray-600 font-roboto text-sm font-medium">
													{product?.subcategory?.name}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="w-[30rem] place-content-center place-items-center grid grid-cols-2 p-4">
								<div className="w-14 h-full">
									<Image
										image="/images/notfound.png"
										altImage="not found image icon"
									/>
								</div>
								<h1 className="text-2xl font-poppins font-medium text-red-500">
									Not found any products
								</h1>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default OneSubCategory

// {isLoaderSkeleton ? (
// 			<div className="flex gap-4 w-full border">
// 				<Skeleton variant="rounded" width={400} height={200} />
// 				{/*<Skeleton variant="rounded" width={320} height={400} />*/}
// 				{/*<Skeleton variant="rounded" width={320} height={400} />*/}
// 			</div>
// 		) : (
