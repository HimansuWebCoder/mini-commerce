function Image({ image, altImage }) {
	return (
		<img
			src={image}
			alt={altImage}
			className="w-full h-full object-contain"
		/>
	)
}

export default Image
