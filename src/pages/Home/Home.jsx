import React from "react";
import Feature from "../../components/Feature/Feature";
import AboutComponent from "../../components/AboutComponent/AboutComponent";
import Professional from "../../components/Professional/Professional";
import ServiceComponent from "../../components/ServiceComponent/ServiceComponent";
import Client from "../../components/Client/Client";
import Contact from "../../components/Contact/Contact";
import { APIProvider } from "@vis.gl/react-google-maps";

const Home = () => {
  return (
    <>
      <Feature />
      <AboutComponent layout={"layout_padding-bottom"} />
      <Professional />
      <ServiceComponent />
      <Client />
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Contact />
      </APIProvider>
    </>
  );
};

export default Home;
