import React from "react";
import HeroScene from "../components/Home/HeroScene";
import HeroContent from "../components/Home/HeroContent";

const Home = () => {
  return (
    <main className="relative h-screen w-full bg-slate-950 flex items-center justify-center overflow-hidden">
      <HeroScene />

      <HeroContent />
    </main>
  );
};

export default Home;
