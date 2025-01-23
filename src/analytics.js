import ReactGA from "react-ga4";

export const initGA = () => {
  if (process.env.REACT_APP_GA_MEASUREMENT_ID) {
    ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
  }
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export const logButtonClick = (buttonName, location) => {
  logEvent("Button", "Click", `${location} - ${buttonName}`);
};
