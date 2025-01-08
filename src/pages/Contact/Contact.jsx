import React from "react";
import ContactComponent from "../../components/ContactComponent/ContactComponent";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useIntl } from "react-intl";
const Contact = () => {
  const { locale } = useIntl();
  return (
    <APIProvider
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      language={locale}
    >
      <ContactComponent />
    </APIProvider>
  );
};

export default Contact;
