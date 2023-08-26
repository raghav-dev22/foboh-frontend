import React from "react";

const ProductList = () => {
  return (
    <>
      <Header />
      <div className="md:w-4/5	w-full mx-auto">
        <div className="flex justify-start items-center gap-3 pt-8">
          <h5 className="text-black font-medium text-base cursor-pointer">
            Home
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            Account
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            Profile
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            DeliveryContact
          </h5>
        </div>
        <div className="border border-[#E7E7E7] rounded-lg  p-4">
            <p className="font-semibold">
            Red Wine
            </p>
        </div>
      </div>

      <Footer />
      <BottomToTop />
    </>
  );
};

export default ProductList;
