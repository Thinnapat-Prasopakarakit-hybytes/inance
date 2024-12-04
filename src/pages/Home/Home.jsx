import React from "react";
import Feature from "../../components/Feature/Feature";
import About from "../../components/About/About";
import Professional from "../../components/Professional/Professional";
import Service from "../../components/Service/Service";
import Client from "../../components/Client/Client";

const Home = () => {
  return (
    <>
      <Feature />
      <About />
      <Professional />
      <Service />
      <Client />
    </>
  );
};

export default Home;
