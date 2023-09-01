import React from "react";
import Banner from "./Banner";
import ShopSection from "./ShopSection";
import TopRatedSection from "./TopRatedSection";
import ShopBrandSection from "./ShopBrandSection";
import { useSelector } from "react-redux";
const MainHomePage = () => {

  const buyer = useSelector((state) => state.buyer);

  console.log("buyer", buyer);

  return (
    <>
      <Banner />
      <ShopSection />
      <TopRatedSection />
      <ShopBrandSection />
    </>
  );
};

export default MainHomePage;
