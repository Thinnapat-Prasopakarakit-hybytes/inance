import React from "react";
import "./About.scss";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/images/about-img.jpg";
const About = () => {
  return (
    <section class="about_section layout_padding-bottom">
      <div class="container">
        <div class="row">
          <div class="col-lg-5 col-md-6">
            <div class="detail-box">
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
          <div class="col-lg-7 col-md-6">
            <div class="img-box">
              <img src={aboutImg} alt="about-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
