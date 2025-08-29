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
    <div className="w-full flex justify-end items-center">
      <button
        onClick={isShowModalHandler}
        className="flex items-center text-xl font-opensans gap-2 bg-[#EFEEEA] hover:bg-gray-200 text-[#273F4F] font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
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
