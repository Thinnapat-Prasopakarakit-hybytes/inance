import React from "react";
import Feature from "../../components/Feature/Feature";
import About from "../../components/About/About";
import Professional from "../../components/Professional/Professional";
import Service from "../../components/Service/Service";
import Client from "../../components/Client/Client";
import Contact from "../../components/Contact/Contact";

const Home = () => {
  return (
    <>
      <Feature />
      <About />
      <Professional />
      <Service />
      <Client />
      <Contact />
    </>
  );
};

export default Home;
