import React, { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function BottomToTop() {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisible);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
       in place of 'smooth' */
    });
  };
  return (
    <>
      <button
        className="fixed	 bottom-[20px] right-[15px] bg-white rounded-full w-[50px] h-[50px] shadow-lg"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      >
        <ArrowUpwardIcon />
      </button>
    </>
  );
}

export default BottomToTop;
