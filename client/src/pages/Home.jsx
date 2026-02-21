import React from "react";
import HeroContent from "../components/Home/HeroContent";
import About from "../components/Home/About";
import FeaturedEstates from "../components/Home/FeaturedEstates";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="relative w-full">
      <HeroContent />
      <About />
      <FeaturedEstates />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;


