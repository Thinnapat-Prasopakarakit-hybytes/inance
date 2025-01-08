import { useState, createContext, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useLocation, useParams } from "react-router-dom";
import en from "./en.json";
import ar from "./ar.json";

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
    const pathWithoutLang = pathname.replace(/^\/(en|ar)/, "");
    const newPath =
      pathWithoutLang === "" || pathWithoutLang === "/"
        ? `/${newLocale}`
        : `/${newLocale}${pathWithoutLang}`;

    window.location.href = newPath;
  };

  return (
    <LanguageContext.Provider value={{ locale, handleLanguageChange }}>
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
