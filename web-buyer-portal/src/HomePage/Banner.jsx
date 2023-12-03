import { theme } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Banner() {
  const buyer = useSelector((state) => state.buyer);
  const organisation = useSelector((state) => state.organisation);
  const navigate = useNavigate();

  const { useToken } = theme;
  const { token } = useToken();

  return (
    <>
      <div
        style={{ background: token.bannerThemeColor }}
        className=" flex flex-wrap xl:py-6 md:py-6 py-3 items-center justify-center h-[461px] md:p-0 p-6"
      >
        <div className="md:w-2/5 w-full	">
          <h5
            style={{ color: token.commonThemeColor }}
            className="text-[#000] xl:text-[#563FE3] md:text-[#563FE3] xl:text-start md:text-start text-center font-semibold	text-2xl mb-3 xl:text-xl md:text-xl	"
          >
            Hello {buyer?.name || ["first name"]} 👋
          </h5>
          <h1 className="xl:font-bold md:font-bold text-xl text-[#8F959E]	xl:text-[#212B36] md:text-[#212B36] mb-3 xl:text-4xl md:text-3xl  xl:text-start md:text-start text-center">
            Welcome to {organisation?.businessName || ["Supplier name"]}
          </h1>
          <div className="bg-[#563FE3] xl:bg-[unset] md:bg-[unset] xl:mx-0 md:mx-0 mx-[2rem] xl:p-0 md:p-0 p-5 rounded-xl">
            <p className="text-[#fff] xl:text-[#637381] md:text-[#637381] font-normal text-base mb-3">
              Browse our range, select your favourites and manage your orders
              and payments all in one place
            </p>
            <div className="mt-2 text-center xl:text-start md:text-start">
              <button
                onClick={() => {
                  navigate("/home/all-products");
                }}
                style={{ backgroundColor: token.buttonThemeColor }}
                className=" bg-[#fff] xl:bg-[#563FE3] md:bg-[#563FE3] py-2.5	px-7	rounded-3xl"
              >
                <p className="text-[#563FE3] xl:text-white md:text-white font-semibold text-base">
                  Shop now
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-2/5	 w-full justify-center md:flex hidden	">
          <div className="logo relative">
            {(
              <img
                src={
                  organisation?.organisationlogo
                    ? organisation?.organisationlogo
                    : "/assets/SUPPLIERLOGO.png"
                }
                alt="organisationlogo"
                className="mt-0 mr-0 mb-0 ml-[40px] max-h-[150px] w-full object-contain"
              />
            ) || (
              <img
                src="/assets/SUPPLIERLOGO.png"
                alt=""
                className="mt-0 mr-0 mb-0 ml-[40px]"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
