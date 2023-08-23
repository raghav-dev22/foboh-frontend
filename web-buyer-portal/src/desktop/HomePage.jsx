// import { Fragment, useState } from "react";

import React, { useState } from "react";
import Header from "./Header";
import Banner from "./Banner";
import ShopSection from "./ShopSection";
import TopRatedSection from "./TopRatedSection";
import ShopBrandSection from "./ShopBrandSection";
import Footer from "./Footer";
import BottomToTop from "./BottomToTop";
function HomePage() {
  const [count, setCount] = useState(0);
  const [addData, setAddData] = useState([]);
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
