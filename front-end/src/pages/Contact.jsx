import axios from "axios";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: ""
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/contact/contacts", formData);
      setSent(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      // تخلي رسالة النجاح تختفي بعد 3 ثواني
      setTimeout(() => {
        setSent(false);
      }, 3000);
    } catch (err) {
      alert("Failed to send message.");
    }
  };

  return (
    <>
      <div className="home">
        <div className="container my-5" >
          <div className="contact-section position-relative row">
            <div className="col-md-6">
              <div className="contact-box">
                <h1>Contact us</h1>
                <p>Ask for a quotation from us!</p>
                <form onSubmit={handleSubmit}>
                  <input
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                    placeholder="Name"
                  />
                  <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                    placeholder="Email"
                  />
                  <input
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    placeholder="Phone"
                  />
                  <textarea
                    name="message"
                    rows="4"
                    onChange={handleChange}
                    value={formData.message}
                    placeholder="Your message"
                    required
                  />
                  <button type="submit">SEND</button>
                  {sent && (
                    <div
                      className="text-success mt-2"
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                      }}
                    >
                      Message sent!
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column justify-content-center align-items-start mt-4 mt-md-0">
              <div className="contact-info ">
                <h5 style={{ fontSize: "30px" }}>Contact Information</h5>
                <p><strong>Email:</strong> Swiftride@gmail.com</p>
                <p><strong>Phone:</strong> +212 605 751 866</p>
                <p><strong>Location:</strong> Casablanca, Morocco</p>
              </div>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-x-twitter"></i>
                </a>
              </div>
            </div>

            <div className="yellow-icon"><i className="fas fa-location-dot"></i></div>

          </div>

          <div className="row">
            <div className="col-md-12" style={{ border: "solid 3px #111", borderRadius: "20px", marginTop: "4rem" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108702.95890934646!2d-8.090255669494086!3d31.634741151654097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee878b66b78f%3A0x88ccf6c9ced0f11c!2sJardin%20Majorelle!5e0!3m2!1sfr!2sma!4v1753894120128!5m2!1sfr!2sma"
                width="100%"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
