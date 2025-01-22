import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Contact from "./Contact";
import { APIProvider } from "@vis.gl/react-google-maps";
import { LanguageContext } from "../../i18n/LanguageProvider";
import { IntlProvider } from "react-intl";
import en from "../../i18n/en.json";
import ar from "../../i18n/ar.json";

jest.mock("@vis.gl/react-google-maps", () => ({
  APIProvider: ({ children }) => (
    <div data-testid="mock-api-provider">{children}</div>
  ),
  Map: ({ defaultZoom, defaultCenter, gestureHandling, disableDefaultUI }) => (
    <div
      data-testid="mock-map"
      data-props={JSON.stringify({
        defaultZoom,
        defaultCenter,
        gestureHandling,
        disableDefaultUI,
      })}
    />
  ),
}));

const messages = {
  en,
  ar,
};

const renderContact = (locale = "en") => {
  return render(
    <BrowserRouter>
      <LanguageContext.Provider value={{ locale }}>
        <IntlProvider messages={messages[locale]} locale={locale}>
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <Contact />
          </APIProvider>
        </IntlProvider>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

describe("Contact Page", () => {
  it("should render contact form", () => {
    renderContact();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
  });

  it("should render map component", () => {
    renderContact();
    const mapElement = screen.getByTestId("mock-map");
    expect(mapElement).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderContact();
    expect(asFragment()).toMatchSnapshot();
  });
});
