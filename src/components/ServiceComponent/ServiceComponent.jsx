import React from "react";
import "./ServiceComponent.scss";
import s1 from "../../assets/images/s1.png";
import s2 from "../../assets/images/s2.png";
import s3 from "../../assets/images/s3.png";
import { Link } from "react-router-dom";

const ServiceComponent = () => {
  const services = [
    {
      image: s1,
      title: "Maintenance",
      description:
        "when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    },
    {
      image: s2,
      title: "Electrical",
      description:
        "when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    },
    {
      image: s3,
      title: "Plumbing",
      description:
        "when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    },
  ];

  return (
    <section className="service_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Our Services</h2>
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
          <Link to="/"> View More </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceComponent;
