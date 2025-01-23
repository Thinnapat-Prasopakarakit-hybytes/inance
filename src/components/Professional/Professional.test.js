import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Professional from "./Professional";
import { IntlProvider } from "react-intl";
import { LanguageContext } from "../../i18n/LanguageProvider";
import en from "../../i18n/en.json";
import ar from "../../i18n/ar.json";

const messages = {
  en,
  ar,
};

const renderProfessionalComponent = (locale = "en") => {
  return render(
    <BrowserRouter>
      <LanguageContext.Provider value={{ locale }}>
        <IntlProvider messages={messages[locale]} locale={locale}>
          <Professional />
        </IntlProvider>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

describe("Professional Component", () => {
  it("should render with correct layout class", () => {
    renderProfessionalComponent();
    const section = screen.getByRole("region");
    expect(section).toHaveClass("professional_section layout_padding");
  });

  it("should render professional image with correct attributes", () => {
    renderProfessionalComponent();
    const image = screen.getByAltText("professional-img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mock-professional-image");
  });

  it("should render heading and content", () => {
    renderProfessionalComponent();
    expect(screen.getByText(/We Provide Professional/i)).toBeInTheDocument();
    expect(screen.getByText(/Home Services/i)).toBeInTheDocument();
    expect(screen.getByText(/randomised words which/i)).toBeInTheDocument();
  });

  it("should render Read More link that points to home", () => {
    renderProfessionalComponent();
    const link = screen.getByText("Read More");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/en");
  });

  it("should match snapshot", () => {
    const { asFragment } = renderProfessionalComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
