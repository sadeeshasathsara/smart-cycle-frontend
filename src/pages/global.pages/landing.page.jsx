import React from "react";
import HeroSlider from "../../components/global.components/hero.slider";
import Navbar from "../../components/global.components/navbar";
import SmartCycleSections from "../../components/global.components/smart.cycle.section";
import Footer from "../../components/global.components/footer";

export default function LandingPage() {
  React.useEffect(() => {
    document.title = "Smart Cycle - Home";
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <HeroSlider />
      </div>
      <div>
        <SmartCycleSections />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
