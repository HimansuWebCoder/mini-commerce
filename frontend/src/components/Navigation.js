import { CiCirclePlus } from 'react-icons/ci'
import { Link } from 'react-router'
import AddProduct from './AddProduct'
import { useState } from 'react'

function Navigation() {
  const [isShowModal, setIsShowModal] = useState(false)
  const [show, setShow] = useState(false)

  function isShowModalHandler() {
    setIsShowModal(true)
  }

  return (
    <div className="">
      <div className="w-full">
        {/*<div className="bg-gradient-to-r from-[#2C4E80] to-[#34699A]  shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">*/}
        <div className="bg-gradient-to-r from-[#2C4E80] to-[#34699A] place-content-center place-items-center shadow-md p-4 grid grid-cols-5 gap-4">
          <div className="flex  col-span-2 flex-col w-16 md:flex-row md:items-center md:gap-8 ">
            <div className="flex items-center w-12 h-fit aspect-[1/1] gap-2">
              <Link to="/">
                <img
                  src="/images/shop.png"
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>
          </div>

          <div className="flex gap-4   col-span-3  justify-start items-center w-full">
            <div className="rounded-lg p-2 border border-gray-400 hover:bg-[#2C4E80] text-white cursor-pointer text-xl font-opensans font-bold">
              <Link to="/products">All Products</Link>
            </div>

            <div className="rounded-lg p-2 border border-gray-400 hover:bg-[#2C4E80] text-white cursor-pointer text-xl font-opensans font-bold">
              <Link to="/category">Category</Link>
            </div>

            <div className="rounded-lg p-2 border border-gray-400 hover:bg-[#2C4E80] text-white cursor-pointer text-xl font-opensans font-bold">
              <Link to="/subcategory">SubCategory</Link>
            </div>
          </div>
        </div>
      </div>
      {isShowModal && (
        <AddProduct isShow={show} setIsShowModal={setIsShowModal} />
      )}
    </div>
  )
}

export default Navigation
