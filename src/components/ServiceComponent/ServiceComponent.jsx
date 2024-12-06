import React from "react";
import "./ServiceComponent.scss";
import s1 from "../../assets/images/s1.png";
import s2 from "../../assets/images/s2.png";
import s3 from "../../assets/images/s3.png";
import { Link } from "react-router-dom";

const ServiceComponent = () => {
  return (
    <section className="service_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Our Services</h2>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-4 mx-auto px-3">
            <div className="box">
              <div className="img-box">
                <img src={s1} alt="s1" />
              </div>
              <div className="detail-box">
                <h5>Maintenance</h5>
                <p>
                  when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 mx-auto px-3">
            <div className="box">
              <div className="img-box">
                <img src={s2} alt="s2" />
              </div>
              <div className="detail-box">
                <h5>Electrical</h5>
                <p>
                  when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 mx-auto px-3">
            <div className="box">
              <div className="img-box">
                <img src={s3} alt="s3" />
              </div>
              <div className="detail-box">
                <h5>Plumbing</h5>
                <p>
                  when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-box">
          <Link to="/"> View More </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceComponent;
