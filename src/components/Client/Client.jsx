import React from "react";
import "./Client.scss";
import ReactDOMServer from "react-dom/server";
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import client1 from "../../assets/images/client-1.jpg";
import client2 from "../../assets/images/client-2.jpg";
import OwlCarousel from "react-owl-carousel";

const Client = () => {
  const clients = [
    {
      image: client1,
      info: {
        name: "Jorch morik",
        rating: 5,
      },
      text: "chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum",
    },
    {
      image: client2,
      info: {
        name: "Jorch morik",
        rating: 5,
      },
      text: "chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum",
    },
    {
      image: client1,
      info: {
        name: "Jorch morik",
        rating: 5,
      },
      text: "chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum",
    },
    {
      image: client2,
      info: {
        name: "Jorch morik",
        rating: 5,
      },
      text: "chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum",
    },
  ];

  const options = {
    loop: true,
    margin: 20,
    nav: true,
    navText: [
      ReactDOMServer.renderToString(<FaArrowLeft />),
      ReactDOMServer.renderToString(<FaArrowRight />),
    ],
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    rewind: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      768: {
        items: 2,
        nav: true,
      },
    },
    navElement: "div",
    smartSpeed: 500,
    items: 1,
  };

  return (
    <section className="client_section">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>What Our Clients Say</h2>
        </div>
        <div className="carousel-wrap layout_padding2-top">
          <OwlCarousel className="owl-theme" {...options}>
            {clients.map((client, index) => (
              <div key={index} className="item">
                <div className="box">
                  <div className="client_id">
                    <div className="img-box">
                      <img src={client.image} alt={client.info.name} />
                    </div>
                    <div className="client_detail">
                      <div className="client_info">
                        <h6>{client.info.name}</h6>
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < client.info.rating
                                  ? "rating_star yellow"
                                  : "rating_star black"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <FaQuoteLeft className="quote-icon" />
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
