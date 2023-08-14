import React from "react";

function Banner() {
  return (
    <>
      <div className="banner flex flex-wrap py-6 items-center justify-center h-[461px] md:p-0 p-6">
        <div className="	 w-full justify-center md:hidden flex	">
          <div className="logo ">
            <img src="/assets/SUPPLIERLOGO.png" alt="" />
          </div>
        </div>
        <div className="md:w-2/5	 w-full	">
          <h5 className="text-[#563FE3] font-semibold	text-xl mb-3	">
            Hello [first name] 👋
          </h5>
          <h1 className="font-bold text-xl	text-[#212B36] mb-3">
            Welcome to Supplier name
          </h1>
          <p className="text-[#637381] font-normal text-base	mb-3">
            Browse our range, select your favourites and manage your orders and
            payments all in one place
          </p>
          <div className="mt-2">
            <button className="bg-[#563FE3] py-2.5	px-7	rounded-3xl	">
              <p className="text-white font-semibold text-base">Shop now</p>
            </button>
          </div>
        </div>
        <div className="md:w-2/5	 w-full justify-center md:flex hidden	">
          <div className="logo ">
            <img src="/assets/SUPPLIERLOGO.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
