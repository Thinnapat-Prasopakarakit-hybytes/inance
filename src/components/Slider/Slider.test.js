import React from "react";
import { render, screen } from "@testing-library/react";
import Slider from "./Slider";
import { BrowserRouter } from "react-router-dom";
import { LanguageContext } from "../../i18n/LanguageProvider";
import { IntlProvider } from "react-intl";
import en from "../../i18n/en.json";
import ar from "../../i18n/ar.json";

const messages = {
  en,
  ar,
};

const renderSlider = (locale = "en") => {
  return render(
    <BrowserRouter>
      <LanguageContext.Provider value={{ locale }}>
        <IntlProvider messages={messages[locale]} locale={locale}>
          <Slider />
        </IntlProvider>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

describe("Slider Component", () => {
  it("should render the main heading", () => {
    renderSlider();
    const heading = screen.getByText(/Repair and/i);
    expect(heading).toBeInTheDocument();
  });

  it("should render the description text", () => {
    renderSlider();
    const description = screen.getByText(/Lorem ipsum dolor sit amet/i);
    expect(description).toBeInTheDocument();
  });

  it("should render the contact us link", () => {
    renderSlider();
    const contactLink = screen.getByText(/Contact Us/i);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/en/contact");
  });

  it("should render the slider image", () => {
    renderSlider();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "mock-slider-img");
    expect(image).toHaveAttribute("alt", "slider img");
  });

  it("should match snapshot", () => {
    const { asFragment } = renderSlider();
    expect(asFragment()).toMatchSnapshot();
  });
});
