import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";

import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useSelector } from "react-redux";
import { theme } from "antd";

function Footer() {
  const organisation = useSelector((state) => state.organisation);
  const { useToken } = theme;
  const { token } = useToken();
  const buyer = useSelector((state) => state.buyer);
  console.log(
    buyer,
    "buyer=====================================================>"
  );

  return (
    <>
      <div
        style={{ background: token.buttonThemeColor }}
        className="footer h-full bg-[#563FE3] p-10  grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 relative"
      >
        <img
          src="/assets/Ellipse1.png"
          alt=""
          className="absolute right-[204px] top-0"
        />
        <img
          src="/assets/Ellipse2.png"
          alt=""
          className="absolute bottom-0 left-[180px]"
        />

        <div className="text-start md:text-start lg:text-center xl:text-center relative">
          <h1 className="text-white text-sm font-[400] my-1">powered by </h1>
          <a href="">
            <i>
              <img
                src="/assets/FOBOHicon.svg"
                alt=""
                className="text-center absolute right-[44%]"
              />
            </i>
          </a>
        </div>

        <div className="">
          <p className="font-[500] text-sm text-white mb-5">Contact us</p>
          <p className="font-normal text-sm mb-5 text-[#fff]">
            {buyer?.orderingContactMobile || ["0400 000 000"]}
          </p>
          <p className="font-normal text-sm text-[#fff] mb-5">
            {buyer?.orderingContactEmail || ["help@logoipsum.com"]}
          </p>
        </div>

        <div className="grid lg:grid-cols-1 lg:justify-between sm:justify-start md:gap-0 gap-5 lg:items-center items-start lg:mt-5 mt-0">
          {/* <div className="flex  gap-3   items-end">
            <div
              style={{ background: token.bannerThemeColor }}
              className="w-[40px] h-[40px] rounded-full bg-[#6752E6] justify-center items-center flex social-icon"
            >
              <InstagramIcon />
            </div>
            <div
              style={{ background: token.bannerThemeColor }}
              className="w-[40px] h-[40px] rounded-full bg-[#6752E6] justify-center items-center flex social-icon"
            >
              <FacebookIcon />
            </div>
            <div
              style={{ background: token.bannerThemeColor }}
              className="w-[40px] h-[40px] rounded-full bg-[#6752E6] justify-center items-center flex social-icon"
            >
              <YouTubeIcon />
            </div>
          </div> */}

          <div className="text-start md:text-start xl:text-center">
            <p className="text-sm font-bold text-[#fff]">
              © 2023 — Copyright —{" "}
              {organisation.businessName || "Supplier name"}
            </p>
            <p className="text-[14px] font-[400] text-[#fff] my-2">
              Liquor Licence: LIQP770016926
            </p>
          </div>
          {/* <div className="md:flex  md:justify-center justify-start items-center lg:gap-16 gap-5 relative">
            <div className="h-5	w-px	 bg-white absolute top-0 left-[42%] md:block hidden"></div>
            <p className="text-white text-sm font-bold">Privacy Policy</p>
            <p className="text-white text-sm font-bold md:mt-0 mt-3">
              Terms and Conditions
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Footer;
