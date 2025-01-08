import React from "react";
import "./ServiceComponent.scss";
import s1 from "../../assets/images/s1.png";
import s2 from "../../assets/images/s2.png";
import s3 from "../../assets/images/s3.png";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
const ServiceComponent = () => {
  const { messages, locale } = useIntl();
  const services = [
    {
      image: s1,
      title: messages.services.maintenance,
      description: messages.services.description,
    },
    {
      image: s2,
      title: messages.services.electrical,
      description: messages.services.description,
    },
    {
      image: s3,
      title: messages.services.plumbing,
      description: messages.services.description,
    },
  ];

  return (
    <section className="service_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>{messages.services.title}</h2>
        </div>
        <div className="row">
          {services.map((service, idx) => (
            <div className="col-sm-6 col-md-4 mx-auto px-3" key={idx}>
              <div className="box">
                <div className="img-box">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="detail-box">
                  <h5>{service.title}</h5>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="btn-box">
          <Link to={`/${locale}/about`}> {messages.services.viewMore} </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceComponent;
