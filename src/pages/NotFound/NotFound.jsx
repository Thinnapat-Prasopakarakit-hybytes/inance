import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import "./NotFound.scss";
import { useIntl } from "react-intl";

function NotFound() {
  const { messages } = useIntl();
  const { lang = "en" } = useParams();
  return (
    <div className="notfound">
      <h1 className="notfound_status">404</h1>
      <h2 className="notfound_text">{messages.notFound.text}</h2>
      <h3 className="notfound_text">{messages.notFound.description}</h3>
      <Link
        className="notfound_link"
        to={`${lang !== "en" && lang !== "ar" ? "/" : `/${lang}`}`}
      >
        <FaHouse />
        {messages.notFound.link}
      </Link>
    </div>
  );
}

export default NotFound;
