import React from "react";

import Header from "../../components/common/Home/Header";
import HeroSection from "../../components/common/Home/HeroSection";
import FeaturesSection from "../../components/common/Home/FeaturesSection";
import TestimonialsSection from "../../components/common/Home/TestimonialsSection";
import LoginAction from "../../components/common/Home/LoginAction";
import Footer from "../../components/common/Home/Footer";

function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <LoginAction />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}

export default Home;
