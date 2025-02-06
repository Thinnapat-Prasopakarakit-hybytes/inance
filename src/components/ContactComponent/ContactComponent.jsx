import "./ContactComponent.scss";
import { Map } from "@vis.gl/react-google-maps";
import { useIntl } from "react-intl";
import { logEvent as logEventGA } from "../../analytics";
import { z } from "zod";
import { collection, addDoc } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { db, analytics } from "../../firebase/config";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const RATE_LIMIT_DURATION = 60 * 60 * 1000;
const MAX_ATTEMPTS = 3;

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
  const [timeUntilNextAttempt, setTimeUntilNextAttempt] = useState(0);

  useEffect(() => {
    let timer;
    if (timeUntilNextAttempt > 0) {
      timer = setInterval(() => {
        setTimeUntilNextAttempt((prev) => {
          const newTime = Math.max(0, prev - 1000);
          if (newTime <= 0) {
            clearInterval(timer);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeUntilNextAttempt]);

  const checkRateLimit = () => {
    const now = Date.now();
    const submissions = JSON.parse(
      localStorage.getItem("formSubmissions") || "[]"
    );
    const recentSubmissions = submissions.filter(
      (time) => now - time < RATE_LIMIT_DURATION
    );

    if (recentSubmissions.length >= MAX_ATTEMPTS) {
      const oldestSubmission = Math.min(...recentSubmissions);
      const waitTime = Math.max(
        0,
        RATE_LIMIT_DURATION - (now - oldestSubmission)
      );
      setTimeUntilNextAttempt(waitTime);
      return false;
    }

    setTimeUntilNextAttempt(0);
    return true;
  };

  const updateRateLimit = () => {
    const now = Date.now();
    const submissions = JSON.parse(
      localStorage.getItem("formSubmissions") || "[]"
    );

    const recentSubmissions = submissions
      .filter((time) => now - time < RATE_LIMIT_DURATION)
      .concat(now);

    localStorage.setItem("formSubmissions", JSON.stringify(recentSubmissions));
  };

  const ContactSchema = z.object({
    name: z.string().min(3, { message: messages.contact.errors.name }),
    phone: z.string().min(10, { message: messages.contact.errors.phone }),
    email: z
      .string()
      .min(1, { message: messages.contact.errors.email.required })
      .email({ message: messages.contact.errors.email.invalid }),
    message: z.string().min(10, { message: messages.contact.errors.message }),
  });

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

  const formatTimeRemaining = (ms) => {
    if (ms <= 0) return "0m 0s";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.ceil((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkRateLimit()) {
      setSubmitStatus({
        type: "error",
        message: `Rate limit exceeded. Please wait ${formatTimeRemaining(
          timeUntilNextAttempt
        )} before trying again.`,
      });
      return;
    }

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

      updateRateLimit();
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
      setSubmitStatus({
        type: "success",
        message: messages.contact.status.success,
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
          message: messages.contact.status.error,
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
                <button
                  type="submit"
                  disabled={isSubmitting || timeUntilNextAttempt > 0}
                >
                  {isSubmitting
                    ? messages.contact.sending
                    : messages.contact.send}
                </button>
              </div>
              {submitStatus && (
                <div className={`submit-status ${submitStatus.type}`}>
                  {timeUntilNextAttempt > 0
                    ? `Rate limit exceeded. Please wait ${formatTimeRemaining(
                        timeUntilNextAttempt
                      )} before trying again.`
                    : submitStatus.message}
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
