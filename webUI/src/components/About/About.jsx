import React from "react";
import StorySlider from "./StorySlider";
import WhoWeAre from "./WhoWeAre";
import WhatWeDo from "./WhatWeDo";
import WhyChooseUs from "./WhyChooseUs";
import OurMission from "./OurMission";
import OurVision from "./OurVision";
import FAQSection from "./FAQsection";
import FounderCEO from "./FounderCEO";

const About = () => {
  return (
    <div>
      <StorySlider />
      <WhoWeAre />
      <WhatWeDo />
      <WhyChooseUs />
      <OurMission />
      <OurVision />
      <FounderCEO/>
      <FAQSection />
    </div>
  )
}


export default About;