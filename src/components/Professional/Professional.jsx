import React from "react";
import { Link } from "react-router-dom";
import professionalImg from "../../assets/images/professional-img.png";
import "./Professional.scss";
import { useIntl } from "react-intl";
const Professional = () => {
  const { messages, locale } = useIntl();
  return (
    <section
      className="professional_section layout_padding"
      aria-label="Professional Services"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="img-box">
              <img
                src={professionalImg}
                alt="professional-img"
                className={locale === "ar" ? "rtl-img" : ""}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="detail-box">
              <h2>
                {messages.professional.title} <br />
                {messages.professional.subtitle}
              </h2>
              <p>{messages.professional.description}</p>
              <Link to="/"> {messages.professional.readMore} </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Professional;
