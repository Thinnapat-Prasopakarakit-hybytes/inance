import { useState, createContext, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useLocation, useParams } from "react-router-dom";
import en from "./en.json";
import ar from "./ar.json";
import { HelmetProvider } from "react-helmet-async";
import SEO from "../components/SEO";
import { logEvent, logLanguageChange } from "../analytics";

export const LanguageContext = createContext();

const messages = {
  en,
  ar,
};

const LanguageProvider = ({ children }) => {
  const { lang } = useParams();
  const { pathname } = useLocation();
  const [locale, setLocale] = useState(lang === "ar" ? "ar" : "en");

  useEffect(() => {
    if (lang && (lang === "en" || lang === "ar")) {
      localStorage.setItem("lang", lang);
      setLocale(lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const handleLanguageChange = (newLocale) => {
    if (locale !== newLocale) {
      logEvent("Language", "Change", newLocale);
      const pathWithoutLang = pathname.replace(/^\/(en|ar)/, "");
      const newPath =
        pathWithoutLang === "" || pathWithoutLang === "/"
          ? `/${newLocale}`
          : `/${newLocale}${pathWithoutLang}`;

      window.location.href = newPath;
    }
  };

  return (
    <HelmetProvider>
      <LanguageContext.Provider value={{ locale, handleLanguageChange }}>
        <IntlProvider
          messages={messages[locale]}
          locale={locale}
          defaultLocale="en"
        >
          <SEO lang={locale} />
          {children}
        </IntlProvider>
      </LanguageContext.Provider>
    </HelmetProvider>
  );
};

export default LanguageProvider;
