import React from "react";
import Feature from "../../components/Feature/Feature";
import About from "../../components/About/About";
import Professional from "../../components/Professional/Professional";
import Service from "../../components/Service/Service";
import Client from "../../components/Client/Client";
import Contact from "../../components/Contact/Contact";
import { APIProvider } from "@vis.gl/react-google-maps";
import Info from "../../components/Info/Info";

const Home = () => {
  return (
    <>
      <Feature />
      <About />
      <Professional />
      <Service />
      <Client />
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Contact />
      </APIProvider>
      <Info />
    </>
  );
};

export default Home;
