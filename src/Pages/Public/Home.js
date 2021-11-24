import React from "react";
import Hero from "../../components/Public/Home/Hero";
import Info from "../../components/Public/Home/Info";
import Steps from "../../components/Public/Home/Steps";
import Testimonial from "../../components/Public/Home/Testimonial";

import Navbar from "../../components/Public/Navbar";
import Footer from "../../components/Public/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Info />
      <Steps />
      <Testimonial />
      <Footer />
    </>
  );
}

export default Home;
