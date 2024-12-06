import React from "react";
import "./AboutComponent.scss";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/images/about-img.jpg";
const AboutComponent = ({ layout }) => {
  return (
    <section className={`about_section ${layout}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="detail-box">
              <h2>About us</h2>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomisedThere are many variations of
                passages of Lorem Ipsum available, but the majority have
                suffered alteration in some form, by injected humour, or
                randomised
              </p>
              <Link to="/"> Read More </Link>
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
