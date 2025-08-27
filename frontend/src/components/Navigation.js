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
    <div>
      <div className="w-full grid grid-cols-1 gap-8 h-fit relative m-auto">
        {/*<div className="bg-gradient-to-r from-[#2C4E80] to-[#34699A]  shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">*/}
        <div className="bg-gradient-to-r from-[#2C4E80] to-[#34699A]  shadow-md p-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:gap-8">
            <div className="flex items-center w-12 h-fit aspect-[1/1] gap-2">
              <Link to="/">
                <img
                  src="./images/shop.png"
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>
            {/*<h1 className="text-white cursor-pointer text-2xl font-roboto font-bold">All Products</h1>*/}
          </div>

          <div className="flex gap-4 justify-end items-end">
            <div className="rounded-lg p-2 border shadow-xl text-white cursor-pointer text-2xl font-opensans font-base">
              <Link to="/products">All Products</Link>
            </div>

            <div className="rounded-lg p-2 border shadow-xl text-white cursor-pointer text-2xl font-opensans font-base">
              <Link to="/category">Category</Link>
            </div>

            <div className="rounded-lg p-2 border shadow-xl text-white cursor-pointer text-2xl font-opensans font-base">
              <Link to="/subcategory">Subcategory</Link>
            </div>
          </div>

          {/*<button
                        onClick={isShowModalHandler}
                        className="flex items-center gap-2 bg-[#EFEEEA] hover:bg-white text-[#273F4F] font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                      >
                        <CiCirclePlus size="24" />
                        Add New product
                      </button>*/}
        </div>
      </div>
      {isShowModal && (
        <AddProduct isShow={show} setIsShowModal={setIsShowModal} />
      )}
    </div>
  )
}

export default Navigation
