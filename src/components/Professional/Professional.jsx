import React from "react";
import { Link } from "react-router-dom";
import professionalImg from "../../assets/images/professional-img.png";
import "./Professional.scss";
const Professional = () => {
  return (
    <section class="professional_section layout_padding">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="img-box">
              <img src={professionalImg} alt="professional-img" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="detail-box">
              <h2>
                We Provide Professional <br />
                Home Services.
              </h2>
              <p>
                randomised words which don't look even slightly believable. If
                you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text. All randomised words which don't look even slightly
              </p>
              <Link to="/"> Read More </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Professional;
