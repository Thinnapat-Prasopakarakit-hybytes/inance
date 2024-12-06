import React from "react";
import AboutComponent from "../../components/AboutComponent/AboutComponent";
import Info from "../../components/Info/Info";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <>
      <AboutComponent layout={"layout_padding"} />
      <Info />
      <Footer />
    </>
  );
};

export default About;
