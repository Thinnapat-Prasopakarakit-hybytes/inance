import "./ContactComponent.scss";
import { Map } from "@vis.gl/react-google-maps";
import { useIntl } from "react-intl";
import { logEvent as logEventGA } from "../../analytics";
import { z } from "zod";
import { collection, addDoc } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { db, analytics } from "../../firebase/config";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ContactSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone must be at least 10 characters" }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

const ContactComponent = () => {
  const { messages, locale } = useIntl();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    logEventGA("Form", "Submit", "Contact Form");
    logEvent(analytics, "submit_form", {
      form_name: "Contact Us",
      success: true,
    });
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      ContactSchema.parse(formData);
      setErrors({});

      await addDoc(collection(db, "contacts"), {
        ...formData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        language: locale,
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        setSubmitStatus({
          type: "error",
          message: "Failed to send message. Please try again later.",
        });
        console.error("Error submitting form:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>{messages.contact.title}</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder={messages.contact.name}
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
              <div>
                <input
                  type="phone"
                  name="phone"
                  placeholder={messages.contact.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder={messages.contact.email}
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div>
                {/* <input
                  type="text"
                  name="message"
                  className={`message-box ${errors.message ? "error" : ""}`}
                  placeholder={messages.contact.message}
                  value={formData.message}
                  onChange={handleChange}
                /> */}
                <textarea
                  type="text"
                  name="message"
                  className={`message-box ${errors.message ? "error" : ""}`}
                  placeholder={messages.contact.message}
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <span className="error-message">{errors.message}</span>
                )}
              </div>
              <div className="d-flex">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "SENDING..." : messages.contact.send}
                </button>
              </div>
              {submitStatus && (
                <div className={`submit-status ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
          <div className="col-md-6">
            <div className="map_container">
              <Map
                defaultZoom={18}
                defaultCenter={{
                  lat: 40.712775,
                  lng: -74.005973,
                }}
                gestureHandling={"greedy"}
                disableDefaultUI
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
