import React from "react";

function ShopBrandSection() {
  return (
    <>
      <div className="Shop-brands-section bg-[#F4F7FF] md:p-0 p-6  ">
        <h2 className="text-center font-bold text-[#212B36] text-3xl	py-10">
          Top rated
        </h2>
        <div className="grid grid-rows-2	md:grid-cols-3	 sm:grid-cols-2  md:w-4/5	w-full mx-auto gap-8">
          <div className="rounded-lg	shadow-md	bg-white w-full py-12 	">
            <h4 className="text-[#212B36] font-bold text-xl	text-center	">
              Brand name 123
            </h4>
          </div>
          <div className="rounded-lg	shadow-md	bg-white w-full py-12 	">
            <h4 className="text-[#212B36] font-bold text-xl	text-center	">
              Brand name 123
            </h4>
          </div>
          <div className="rounded-lg	shadow-md	 bg-white w-full py-12 	 ">
            <h4 className="text-[#212B36] font-bold text-xl		text-center">
              Brand name 123
            </h4>
          </div>
          <div className="rounded-lg	shadow-md	 bg-white w-full py-12 ">
            <h4 className="text-[#212B36] font-bold text-xl		text-center">
              Brand name 123
            </h4>
          </div>
          <div className="rounded-lg	shadow-md	 bg-white w-full py-12 ">
            <h4 className="text-[#212B36] font-bold text-xl		text-center">
              Brand name 123
            </h4>
          </div>
          <div className="rounded-lg	shadow-md	bg-white w-full py-12 ">
            <h4 className="text-[#212B36] font-bold text-xl	text-center	">
              Brand name 123
            </h4>
          </div>
        </div>
        <div className="text-center py-10 ">
          <div className="py-3	px-7	rounded-md	 bg-[#563FE3] w-fit mx-auto">
            <h6 className="font-semibold text-white text-center text-base">
              Explore all products
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopBrandSection;