import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "./About";
import { LanguageContext } from "../../i18n/LanguageProvider";
import { IntlProvider } from "react-intl";
import en from "../../i18n/en.json";
import ar from "../../i18n/ar.json";

const messages = {
  en,
  ar,
};

const renderAbout = (locale = "en") => {
  return render(
    <BrowserRouter>
      <LanguageContext.Provider value={{ locale }}>
        <IntlProvider messages={messages[locale]} locale={locale}>
          <About />
        </IntlProvider>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

describe("About Page", () => {
  it("should render about content", () => {
    renderAbout();
    expect(screen.getByText("About us")).toBeInTheDocument();
    expect(screen.getByText(/There are many variations/)).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderAbout();
    expect(asFragment()).toMatchSnapshot();
  });
});
