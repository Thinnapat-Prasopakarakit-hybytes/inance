import React from "react";
import "./Feature.scss";
import { ReactComponent as Tools } from "../../assets/images/tools.svg";
import { ReactComponent as Construction } from "../../assets/images/construction.svg";
import { ReactComponent as Maintenance } from "../../assets/images/maintenance.svg";
const Feature = () => {
  return (
    <section class="feature_section">
      <div class="container">
        <div class="feature_container">
          <div class="box">
            <div class="img-box">
              <Tools />
            </div>
            <h5 class="name">Repair</h5>
          </div>
          <div class="box active">
            <div class="img-box">
              <Construction />
            </div>
            <h5 class="name">Improve</h5>
          </div>
          <div class="box">
            <div class="img-box">
              <Maintenance />
            </div>
            <h5 class="name">Maintain</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
