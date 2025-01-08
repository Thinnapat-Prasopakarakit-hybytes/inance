import React from "react";
import "./AboutComponent.scss";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/images/about-img.jpg";
import { useIntl } from "react-intl";

const AboutComponent = ({ layout }) => {
  const { messages, locale } = useIntl();
  return (
    <section className={`about_section ${layout}`} aria-label="About Section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="detail-box">
              <h2>{messages.about.title}</h2>
              <p>{messages.about.description}</p>
              <Link to={`/${locale}/about`}> {messages.about.readMore} </Link>
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="img-box">
              <img src={aboutImg} alt="about-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
