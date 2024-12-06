import React from "react";
import "./Contact.scss";
import { Map } from "@vis.gl/react-google-maps";
const Contact = () => {
  return (
    <section className="contact_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>Contact Us</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form action="">
              <div>
                <input type="text" placeholder="Name" />
              </div>
              <div>
                <input type="text" placeholder="Phone Number" />
              </div>
              <div>
                <input type="email" placeholder="Email" />
              </div>
              <div>
                <input type="text" class="message-box" placeholder="Message" />
              </div>
              <div className="d-flex">
                <button>SEND</button>
              </div>
            </form>
          </div>
          <div class="col-md-6">
            <div class="map_container">
              <Map
                defaultZoom={18}
                defaultCenter={{
                  lat: 40.712775,
                  lng: -74.005973,
                }}
                gestureHandling={"greedy"}
                disableDefaultUI
              ></Map>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
