import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";

import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useSelector } from "react-redux";
import { theme } from "antd";
import { json } from "react-router-dom";

function Footer() {
  const organisation = useSelector((state) => state.organisation);
  const { useToken } = theme;
  const { token } = useToken();

  console.log("organisation", organisation);

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
            {organisation?.orderingContactMobile || ["0400 000 000"]}
          </p>
          <p className="font-normal text-sm text-[#fff] mb-5">
            {organisation?.orderingContactEmail || ["help@logoipsum.com"]}
          </p>
        </div>

        <div className="grid lg:grid-cols-1 lg:justify-between sm:justify-start md:gap-0 gap-5 lg:items-center items-start lg:mt-5 mt-0">
          <div className="text-start md:text-start xl:text-center">
            <p className="text-sm font-bold text-[#fff]">
              © 2023 — Copyright —{" "}
              {organisation.businessName || "Supplier name"}
            </p>
            <p className="text-[14px] font-[400] text-[#fff] my-2">
              {organisation.liquorLicense
                ? `Liquor Licence : ${organisation.liquorLicense} `
                : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
