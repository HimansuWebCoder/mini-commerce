import { CiCirclePlus } from 'react-icons/ci'
import { Link } from 'react-router'
import AddProduct from './AddProduct'
import { useState } from 'react'

function AddProductBtn() {
  const [isShowModal, setIsShowModal] = useState(false)
  const [show, setShow] = useState(false)

  function isShowModalHandler() {
    setIsShowModal(true)
  }

  return (
    <div className="w-full flex justify-between items-center py-2 border-b">
      <h1 className="font-poppins text-3xl text-[#44444E] flex justify-start font-medium">
        Manage All Products
      </h1>
      <button
        onClick={isShowModalHandler}
        className="flex items-center text-xl font-opensans gap-2 bg-[#EFEEEA] hover:bg-gray-200 text-[#273F4F] font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        <CiCirclePlus size="24" />
        Add product
      </button>

      {isShowModal && (
        <AddProduct isShow={show} setIsShowModal={setIsShowModal} />
      )}
    </div>
  )
}

export default AddProductBtn
