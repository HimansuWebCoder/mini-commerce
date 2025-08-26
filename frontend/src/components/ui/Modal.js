import { IoMdClose } from "react-icons/io";

function Modal({ child, isTrue, isHideModalHandler }) {
  return (
    <>
      {isTrue && (
        <div
          style={{ backgroundImage: `url("./images/bg.png")` }}
          className="flex justify-center items-center backdrop-filter backdrop-blur-[2px] md:p-0 p-2 w-full fixed top-0 left-0 z-20 h-screen"
        >
          <div className="w-[35rem] h-fit flex justify-center items-center relative m-auto bg-white rounded-lg p-6 md:p-8 shadow-2xl">
            {/* Close button */}
            <div
              onClick={isHideModalHandler}
              className="absolute cursor-pointer top-0 right-0 p-1"
            >
              <IoMdClose size="30" />
            </div>

            {child}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;


// import { useState } from "react";
// import { IoMdClose } from "react-icons/io";

// function Modal({child, isTrue}) {
//  const [ isShowModal, setIsShowModal ] = useState(false);

//  function isShowModalHandler() {
//  	setIsShowModal(true)
//  }

// 	return (
//          <div style={{backgroundImage: `url("./images/bg.png")`}} className={isShowModal ? "hidden" : `flex justify-center items-center backdrop-filter backdrop-blur-[2px] md:p-0 p-2 w-full fixed top-0 left-0 z-20 h-screen`}>

//          	 <div  className="w-[35rem] h-fit flex justify-center items-center relative m-auto bg-white rounded-lg p-6 md:p-8 shadow-2xl">
//          	    <div onClick={isTrue} className="absolute cursor-pointer top-0 right-0 p-1">
//          	    	<IoMdClose size="30" />
//          	    </div>
//          	    {child}
//          	 </div>
//          </div>
// 		)
// }

// export default Modal;
