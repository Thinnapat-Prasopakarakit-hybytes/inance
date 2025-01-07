import React, { useEffect, useState } from "react";
import "./Client.scss";
//import ReactDOMServer from "react-dom/server";
import client1 from "../../assets/images/client-1.jpg";
import client2 from "../../assets/images/client-2.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useIntl } from "react-intl";

const Client = () => {
  const { messages, locale } = useIntl();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [locale]);

  const clients = [
    {
      image: client1,
      info: {
        name: messages.client.name,
        rating: 5,
      },
      text: messages.client.testimonial,
    },
    {
      image: client2,
      info: {
        name: messages.client.name,
        rating: 5,
      },
      text: messages.client.testimonial,
    },
    {
      image: client1,
      info: {
        name: messages.client.name,
        rating: 5,
      },
      text: messages.client.testimonial,
    },
    {
      image: client2,
      info: {
        name: messages.client.name,
        rating: 5,
      },
      text: messages.client.testimonial,
    },
  ];

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    rtl: locale === "ar",
    navText: [
      //React Icons
      // ReactDOMServer.renderToString(<FaLongArrowAltLeft />),
      // ReactDOMServer.renderToString(<FaLongArrowAltRight />),

      //Font Awesome
      '<i class="fa fa-long-arrow-left"></i>',
      '<i class="fa fa-long-arrow-right"></i>',
    ],
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    rewind: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
    navElement: "div",
    smartSpeed: 250,
    items: 1,
  };

  return (
    <section className="client_section">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>{messages.client.title}</h2>
        </div>
        <div className="carousel-wrap layout_padding2-top">
          <OwlCarousel key={key} {...options}>
            {clients.map((client, idx) => (
              <div key={idx} className="item">
                <div className="box">
                  <div className="client_id">
                    <div className="img-box">
                      <img src={client.image} alt={client.info.name} />
                    </div>
                    <div className="client_detail">
                      <div className="client_info">
                        <h6>{client.info.name}</h6>
                        <div className="rating">
                          {[...Array(client.info.rating)].map((_, i) => (
                            <FaStar key={i} className="rating_star" />
                          ))}
                        </div>
                      </div>
                      <FaQuoteLeft
                        className={locale === "ar" ? "rtl-quote" : ""}
                      />
                    </div>
                  </div>
                  <div className="client_text">
                    <p>{client.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default Client;
