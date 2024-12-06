import React from "react";
import ContactComponent from "../../components/ContactComponent/ContactComponent";
import { APIProvider } from "@vis.gl/react-google-maps";

const Contact = () => {
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <ContactComponent />
    </APIProvider>
  );
};

export default Contact;
