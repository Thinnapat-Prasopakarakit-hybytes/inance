import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Service from "./Service";
import { LanguageContext } from "../../i18n/LanguageProvider";
import { IntlProvider } from "react-intl";
import en from "../../i18n/en.json";
import ar from "../../i18n/ar.json";

const messages = {
  en,
  ar,
};

const renderService = (locale = "en") => {
  return render(
    <BrowserRouter>
      <LanguageContext.Provider value={{ locale }}>
        <IntlProvider messages={messages[locale]} locale={locale}>
          <Service />
        </IntlProvider>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

describe("Service Page", () => {
  it("should render service component", () => {
    renderService();
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });

  it("should render all service items", () => {
    renderService();
    expect(screen.getByText("Maintenance")).toBeInTheDocument();
    expect(screen.getByText("Electrical")).toBeInTheDocument();
    expect(screen.getByText("Plumbing")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderService();
    expect(asFragment()).toMatchSnapshot();
  });
});
