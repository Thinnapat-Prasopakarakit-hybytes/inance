import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SEO = () => {
  const location = useLocation();
  const baseUrl = window.location.origin;
  const currentPath = location.pathname;

  const pathWithoutLang = currentPath.replace(/^\/(en|ar)/, "");

  const canonicalUrl = `${baseUrl}/en${pathWithoutLang}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="alternate"
        href={`${baseUrl}/en${pathWithoutLang}`}
        hrefLang="en"
      />
      <link
        rel="alternate"
        href={`${baseUrl}/ar${pathWithoutLang}`}
        hrefLang="ar"
      />
    </Helmet>
  );
};

export default SEO;
