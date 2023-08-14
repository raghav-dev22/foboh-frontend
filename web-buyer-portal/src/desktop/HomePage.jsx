// import { Fragment, useState } from "react";

import React from "react";
import Header from "./Header";
import Banner from "./Banner";
import ShopSection from "./ShopSection";
import TopRatedSection from "./TopRatedSection";
import ShopBrandSection from "./ShopBrandSection";
import Footer from "./Footer";
import BottomToTop from "./BottomToTop";
function HomePage() {
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
}

export default HomePage;
