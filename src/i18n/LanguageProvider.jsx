import { useState, createContext } from "react";
import { IntlProvider } from "react-intl";
import en from "./en.json";
import ar from "./ar.json";

export const LanguageContext = createContext();

const messages = {
  en,
  ar,
};

const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");

  const handleLanguageChange = (newLocale) => {
    setLocale(newLocale);
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
  };

  return (
    <LanguageContext.Provider value={{ handleLanguageChange }}>
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
