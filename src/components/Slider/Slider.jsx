import React from "react";
import "./Slider.scss";
import { Link } from "react-router-dom";
import img from "../../assets/images/slider-img.png";
import { useIntl } from "react-intl";
import { logButtonClick } from "../../analytics";
const Slider = () => {
  const { messages, locale } = useIntl();
  return (
    <section className="slider_section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="detail-box">
              <h1>
                {messages.slider.firstLine} <br />
                {messages.slider.secondLine} <br />
                {messages.slider.thirdLine}
              </h1>
              <p>{messages.slider.description}</p>
              <Link
                to={`/${locale}/contact`}
                onClick={() => logButtonClick("Contact Us", "Hero Section")}
              >
                {" "}
                {messages.slider.contact}{" "}
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="img-box">
              <img src={img} alt="slider img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
