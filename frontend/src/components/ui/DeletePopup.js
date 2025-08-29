import { IoMdClose } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import Modal from './Modal'
import { useState } from 'react'
import { Alert } from 'antd'
import { Spin } from 'antd'

function DeletePopup({ message, isShow, isHideModalHandler, id }) {
	const [deletePopupAlertMsg, setIsDeletePopupAlertMsg] = useState('')
	const [loader, setLoader] = useState(false)
	const [deletePopupAlert, setDeletePopupAlert] = useState(false)
	const [isHideDeleteModal, setIsHideDeleteModal] = useState(true)

	// Delete Products
	function deleteProduct(id) {
		setLoader(true)
		fetch(`http://localhost:4000/products/${id}`, {
			method: 'delete',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then(() => {
				setLoader(false)
				setIsHideDeleteModal(false)
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
	{
	}
	return (
		<Modal
			isTrue={isShow}
			isHideModalHandler={isHideModalHandler}
			popupchild={
				<div className="absolute top-5">
					{deletePopupAlert && (
						<Alert
							message={deletePopupAlertMsg}
							type="success"
							showIcon
						/>
					)}
				</div>
			}
			isShowModal={isHideDeleteModal}
			child={
				<div className=" w-full h-fit flex flex-col gap-2">
					{/*<div className="flex justify-between items-center gap-2">*/}
					<h1 className="font-poppins text-xl font-base">
						{message}
					</h1>
					{/*<MdClose size="30" className="text-black" />*/}
					{/*</div>*/}
					{/*<div className="w-full border h-fit flex  justify-end items-center gap-2">*/}
					<div className="w-full h-fit grid grid-cols-2 gap-2">
						<button className="font-poppins text-xl border rounded-lg font-medium  h-fit p-2">
							Cancel
						</button>
						{loader ? (
							<button
								className="font-poppins text-xl flex justify-center items-center gap-2 bg-red-500 rounded-lg text-white font-medium h-fit p-2"
								onClick={() => deleteProduct(id)}
							>
								Deleting... <Spin />
							</button>
						) : (
							<button
								className="font-poppins text-xl bg-red-500 rounded-lg text-white font-medium h-fit p-2"
								onClick={() => deleteProduct(id)}
							>
								Delete
							</button>
						)}
					</div>
				</div>
			}
		/>
	)
}

export default DeletePopup
