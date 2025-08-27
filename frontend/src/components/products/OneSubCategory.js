import { useContext } from 'react'
import { SubCategoryContext } from '../../context/SubCategoryContext'
import Skeleton from '@mui/material/Skeleton'
import { Link } from 'react-router'
function OneSubCategory() {
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

	return (
		<div className="grid grid-cols-2 gap-4 lg:grid-cols-4 w-[80rem] md:grid-cols-4 sm:grid-cols-2 p-4">
			<>
				{oneSubCategories.map((product) => (
					<div
						key={product._id}
						className="grid grid-cols-1 gap-1 md:gap-3 p-4 relative rounded-lg shadow-lg"
					>
						<div className="">
							<div className="bg-[#f5f5f5] w-full h-40 rounded-sm aspect-[1/1] relative p-4">
								<Link
									to={`/products/${product._id}`}
									className=""
								>
									<img
										className="w-full h-full object-contain"
										src={product.productImg}
										alt="product image"
									/>
								</Link>
							</div>
						</div>

						<div className="w-full text-left line-clamp-2">
							<h3 className="text-sm md:text-xl line-clamp-1 md:line-clamp-none text-[#44444E] font-medium font-poppins">
								{product.productName}
							</h3>
						</div>
						<div className="flex w-full flex-col justify-between items-start h-auto">
							<div className="text-left line-clamp-3">
								<p className="text-gray-500 font-poppins tracking-widest">
									${product.productDescription}
								</p>
							</div>
							<div>
								<p className="text-[#db4444] font-poppins">
									${product.productPrice}
								</p>
							</div>
							<div className="w-fit h-fit rounded-lg bg-gray-200 p-2">
								<p className="text-gray-600 font-roboto text-sm font-medium">
									{product.subcategory.name}
								</p>
							</div>
						</div>
					</div>
				))}
			</>
			{/*)}*/}
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
