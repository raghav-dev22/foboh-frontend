import React, { useEffect } from "react";
import Banner from "./Banner";
import ShopSection from "./ShopSection";
import TopRatedSection from "./TopRatedSection";
import { useSelector } from "react-redux";

const MainHomePage = () => {
  const buyer = useSelector((state) => state.buyer);
  useEffect(() => {}, []);
  return (
    <>
      <Banner />
      <ShopSection />
      <TopRatedSection />
    </>
  );
};

export default MainHomePage;
