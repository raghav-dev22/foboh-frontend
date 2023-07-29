import React from "react";
import { useNavigate } from "react-router-dom";

function ViewProductHeader({productName}) {
  const navigate = useNavigate()

  return (
    <>
      <div className="py-6 sm:flex grid items-center justify-between px-6 gap-5">
        <div className="flex justify-start gap-3 items-center">
          <button onClick={() => navigate('/dashboard/products')} className="">
            <img src="/assets/previousBtn.png" alt="" />
          </button>
          <h4 className=" text-2xl		font-semibold	 	text-darkGreen">
           { productName || "Good Intentions 'Cape Jaffa' Chardonnay"}{" "}
          </h4>
        </div>
      </div>
    </>
  );
}

export default ViewProductHeader;
