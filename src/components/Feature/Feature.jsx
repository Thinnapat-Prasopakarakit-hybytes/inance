import React from "react";
import "./Feature.scss";
import { ReactComponent as Tools } from "../../assets/images/tools.svg";
import { ReactComponent as Construction } from "../../assets/images/construction.svg";
import { ReactComponent as Maintenance } from "../../assets/images/maintenance.svg";
const Feature = () => {
  return (
    <section className="feature_section">
      <div className="container">
        <div className="feature_container">
          <div className="box">
            <div className="img-box" data-testid="tools-icon">
              <Tools />
            </div>
            <h5 className="name">Repair</h5>
          </div>
          <div className="box active" data-testid="active">
            <div className="img-box" data-testid="construction-icon">
              <Construction />
            </div>
            <h5 className="name">Improve</h5>
          </div>
          <div className="box">
            <div className="img-box" data-testid="maintenance-icon">
              <Maintenance />
            </div>
            <h5 className="name">Maintain</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
