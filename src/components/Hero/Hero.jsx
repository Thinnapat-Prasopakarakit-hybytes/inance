import Header from "../Header/Header";
import Slider from "../Slider/Slider";
import { useLocation } from "react-router-dom";
import "./Hero.scss";
export const Hero = () => {
  const location = useLocation();

  return (
    <div className="hero">
      <Header />
      {location.pathname === "/" && <Slider />}
    </div>
  );
};
