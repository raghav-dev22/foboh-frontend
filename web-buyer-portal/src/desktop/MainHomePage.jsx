import React from "react";
import Banner from "./Banner";
import ShopSection from "./ShopSection";
import TopRatedSection from "./TopRatedSection";
import ShopBrandSection from "./ShopBrandSection";

const MainHomePage = () => {
  return (
    <>
      {/* <Header /> */}
      <Banner />
      <ShopSection />
      <TopRatedSection />
      <ShopBrandSection />
      {/* <Footer /> */}
    </>
  );
};

export default MainHomePage;
