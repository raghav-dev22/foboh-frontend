import React from "react";

function ProductEditHeader({handleSubmit, handleReset}) {


  return (
    <>
      <div className="2xl:container 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
        <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
          <div className="block">
            <nav className="flex h-[65px] items-center justify-end gap-5 ">
              <button onClick={handleReset} className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	">
                Cancel
              </button>
              <button onClick={handleSubmit} className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	">
                Save
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductEditHeader;
