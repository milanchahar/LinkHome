import About from "../components/Home/About";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonials";

const Home = () => {
  return (
    <div className="relative w-full">
      <HeroContent />
      <About />
      <Features />
      <Testimonials />
      {/* Additional sections will be added here in following steps */}
    </div>


  );
};

export default Home;

