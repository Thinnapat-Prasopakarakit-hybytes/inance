import React from "react";
import "./ContactComponent.scss";
import { Map } from "@vis.gl/react-google-maps";
import { useIntl } from "react-intl";

const ContactComponent = () => {
  const { messages, locale } = useIntl();

  return (
    <section className="contact_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>{messages.contact.title}</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form action="">
              <div>
                <input type="text" placeholder={messages.contact.name} />
              </div>
              <div>
                <input type="text" placeholder={messages.contact.phone} />
              </div>
              <div>
                <input type="email" placeholder={messages.contact.email} />
              </div>
              <div>
                <input
                  type="text"
                  className="message-box"
                  placeholder={messages.contact.message}
                />
              </div>
              <div className="d-flex">
                <button>{messages.contact.send}</button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="map_container">
              <Map
                defaultZoom={18}
                defaultCenter={{
                  lat: 40.712775,
                  lng: -74.005973,
                }}
                gestureHandling={"greedy"}
                disableDefaultUI
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
