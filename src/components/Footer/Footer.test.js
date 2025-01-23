import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { LanguageContext } from "../../i18n/LanguageProvider";
import { IntlProvider } from "react-intl";
import en from "../../i18n/en.json";
import ar from "../../i18n/ar.json";

const messages = {
  en,
  ar,
};

const renderFooter = (locale = "en") => {
  return render(
    <BrowserRouter>
      <LanguageContext.Provider value={{ locale }}>
        <IntlProvider messages={messages[locale]} locale={locale}>
          <Footer />
        </IntlProvider>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

describe("Footer Component", () => {
  it("should render copyright text", () => {
    renderFooter();
    expect(screen.getByText(/All Rights Reserved By/i)).toBeInTheDocument();
  });

  it("should render current year", () => {
    renderFooter();
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it("should render credit link", () => {
    renderFooter();
    const link = screen.getByRole("link", { name: /Free Html Templates/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://html.design/");
  });

  it("should match snapshot", () => {
    const { asFragment } = renderFooter();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Footer Component - Arabic", () => {
  it("should render Arabic copyright text", () => {
    renderFooter("ar");
    expect(screen.getByText(/جميع الحقوق محفوظة/i)).toBeInTheDocument();
  });

  it("should render company name in Arabic", () => {
    renderFooter("ar");
    expect(screen.getByText(/قوالب HTML المجانية/i)).toBeInTheDocument();
  });

  it("should maintain link functionality in Arabic", () => {
    renderFooter("ar");
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://html.design/");
  });

  it("should match Arabic snapshot", () => {
    const { asFragment } = renderFooter("ar");
    expect(asFragment()).toMatchSnapshot();
  });
});
