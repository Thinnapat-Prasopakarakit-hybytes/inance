import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AboutComponent from "./AboutComponent";
import { LanguageContext } from "../../i18n/LanguageProvider";
import { IntlProvider } from "react-intl";
import en from "../../i18n/en.json";
import ar from "../../i18n/ar.json";

const messages = {
  en,
  ar,
};

const renderAboutComponent = (locale = "en") => {
  return render(
    <BrowserRouter>
      <LanguageContext.Provider value={{ locale }}>
        <IntlProvider messages={messages[locale]} locale={locale}>
          <AboutComponent layout="layout_padding" />
        </IntlProvider>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

describe("AboutComponent", () => {
  it("should renders with correct layout class", () => {
    renderAboutComponent();
    const section = screen.getByRole("region", { name: "About Section" });
    expect(section).toHaveClass("about_section layout_padding");
  });

  it("should renders about content", () => {
    renderAboutComponent();
    expect(screen.getByText("About us")).toBeInTheDocument();
    expect(screen.getByText(/There are many variations/)).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("should renders image with correct attributes", () => {
    renderAboutComponent();
    const image = screen.getByAltText("about-img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mock-about-img");
  });

  it("should renders the 'Read More' link to home page", () => {
    renderAboutComponent();
    const link = screen.getByText("Read More");
    expect(link).toHaveAttribute("href", "/en");
  });

  it("should match snapshot", () => {
    const { asFragment } = renderAboutComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
