import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { TfiFacebook, TfiYoutube } from "react-icons/tfi";
import "./Info.scss";
import { Link } from "react-router-dom";

const Info = () => {
  const contactItems = [
    {
      icon: <FaMapMarkerAlt />,
      text: "Lorem Ipsum is simply dummy text",
      link: "/",
    },
    {
      icon: <FaPhoneAlt />,
      text: "+02 1234567890",
      link: "/",
    },
    {
      icon: <FaEnvelope />,
      text: "demo@gmail.com",
      link: "/",
    },
  ];

  const socialItems = [
    { icon: <TfiFacebook />, link: "/" },
    { icon: <FaTwitter />, link: "/" },
    { icon: <TfiYoutube />, link: "/" },
    { icon: <FaInstagram />, link: "/" },
  ];

  return (
    <section className="info_section">
      <div className="container">
        <h4>Get In Touch</h4>
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="info_items">
              <div className="row">
                {contactItems.map((item, idx) => (
                  <div className="col-md-4" key={idx}>
                    <Link to={item.link}>
                      <div className="item">
                        <div className="img-box">{item.icon}</div>
                        <p>{item.text}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="social-box">
        <h4>Follow Us</h4>
        <div className="box">
          {socialItems.map((item, idx) => (
            <Link to={item.link} key={idx}>
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info;
