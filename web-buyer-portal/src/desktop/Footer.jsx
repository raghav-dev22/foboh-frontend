import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";

import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <>
      <div className="footer h-full bg-[#563FE3] p-10  grid lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 ">
        <div className="">
          <p className="font-[500] text-sm text-white mb-5">Contact us</p>
          <p className="font-normal text-sm text-[#BBB2F4] mb-5">
            0400 000 000
          </p>
          <p className="font-normal text-sm text-[#BBB2F4] mb-5">
            help@logoipsum.com
          </p>
        </div>

        <div className="grid lg:grid-cols-3 lg:justify-between md:justify-end sm:justify-start md:gap-0 gap-5 lg:items-center items-start lg:mt-5 mt-0">
          <div className="flex  gap-3   items-end">
            <div className="w-[40px] h-[40px] rounded-full bg-[#6752E6] justify-center items-center flex social-icon">
              <InstagramIcon />
            </div>
            <div className="w-[40px] h-[40px] rounded-full bg-[#6752E6] justify-center items-center flex social-icon">
              <FacebookIcon />
            </div>
            <div className="w-[40px] h-[40px] rounded-full bg-[#6752E6] justify-center items-center flex social-icon">
              <YouTubeIcon />
            </div>
          </div>
          <div className="">
            <p className="text-sm font-bold text-[#BBB2F4]">
              © 2023 — Copyright — Supplier name
            </p>
          </div>
          <div className="md:flex  md:justify-center justify-start items-center lg:gap-16 gap-5 relative">
            <div className="h-5	w-px	 bg-white absolute top-0 left-[42%] md:block hidden"></div>
            <p className="text-white text-sm font-bold">Privacy Policy</p>
            <p className="text-white text-sm font-bold md:mt-0 mt-3">
              Terms and Conditions
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
