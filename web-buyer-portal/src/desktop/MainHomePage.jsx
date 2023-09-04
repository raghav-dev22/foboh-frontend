import React from "react";
import Banner from "./Banner";
import ShopSection from "./ShopSection";
import TopRatedSection from "./TopRatedSection";
import ShopBrandSection from "./ShopBrandSection";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import BottomToTop from "./BottomToTop";
const MainHomePage = () => {
  const buyer = useSelector((state) => state.buyer);

  console.log("buyer", buyer);

  return (
    <>
      <Header />
      <Banner />
      <ShopSection />
      <TopRatedSection />
      <ShopBrandSection />
      <Footer />
      <BottomToTop />
    </>
  );
};

export default MainHomePage;
