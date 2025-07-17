import React, { useState } from 'react';
import '../assets/styles/contactpage.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const socials = [
  { key: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/+2348139386017', icon: 'fab fa-whatsapp' },
  { key: 'facebook', label: 'Facebook', url: 'https://facebook.com/yourpage', icon: 'fab fa-facebook-f' },
  { key: 'instagram', label: 'Instagram', url: 'https://instagram.com/yourhandle', icon: 'fab fa-instagram' },
  { key: 'phone', label: 'Call Us', url: 'tel:+23448139386017', icon: 'fas fa-phone-alt' },
];

const locations = [
  {
    name: 'Beachside Villa',
    address: '123 Seaside Avenue, Beach Town',
    mapSrc: 'https://maps.google.com/?q=123+Seaside+Avenue',
  },
  {
    name: 'Mountain Retreat',
    address: '456 Alpine Road, Hill City',
    mapSrc: 'https://maps.google.com/?q=456+Alpine+Road',
  },
];

const faqs = [
  { q: 'What is your cancellation policy?', a: 'You can cancel free up to 24 hours before check‑in.' },
  { q: 'Do you allow pets?', a: 'Yes—small dogs and cats are welcome with a fee.' },
  { q: 'Is breakfast included?', a: 'All suites include a complimentary continental breakfast.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [faqOpen, setFaqOpen] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = {};
    ['name', 'email', 'subject', 'message'].forEach((f) => {
      if (!form[f]) errs[f] = 'Required';
    });
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert('Message sent! We will get back to you shortly.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <>
      <Navbar />
      <main className="contact-main">
        {/* Hero Intro */}
        <section className="contact-hero">
          <div className="contact-hero-deco" aria-hidden="true" />
          <h1 className="contact-hero-title">Get in Touch With Us</h1>
          <p className="contact-hero-sub">
            Questions? Feedback? We’re here to help — pick a channel or drop us a line below.
          </p>
        </section>

        {/* Socials */}
        <section className="contact-socials">
          {socials.map((s) => (
            <a
              key={s.key}
              href={s.url}
              className="contact-social-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-icon-circle"><i className={s.icon} /></div>
              <span>{s.label}</span>
            </a>
          ))}
        </section>

        {/* Contact Form */}
        <section className="contact-form-section">
          <h2 className="contact-form-title">Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {['name', 'email', 'subject'].map((field) => (
              <div className="contact-form-group" key={field}>
                <label htmlFor={`contact-${field}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  id={`contact-${field}`}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={form[field]}
                  onChange={handleChange}
                  className={errors[field] ? 'contact-invalid' : ''}
                />
                {errors[field] && <small className="contact-error">{errors[field]}</small>}
              </div>
            ))}
            <div className="contact-form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className={errors.message ? 'contact-invalid' : ''}
              />
              {errors.message && <small className="contact-error">{errors.message}</small>}
            </div>
            <button type="submit" className="contact-btn-submit">Send Message</button>
          </form>
        </section>

        {/* Locations */}
        <section className="contact-locations">
          <h2 className="contact-locations-title">Our Locations</h2>
          <div className="contact-locations-grid">
            {locations.map((loc) => (
              <div className="contact-loc-card" key={loc.name}>
                <h3>{loc.name}</h3>
                <p><i className="fas fa-map-marker-alt" /> {loc.address}</p>
                <iframe
                  src={loc.mapSrc}
                  title={loc.name}
                  loading="lazy"
                  className="contact-map-embed"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Support Hours & FAQ */}
        <section className="contact-faq-section">
          <div className="contact-hours">
            <h2>Support Hours</h2>
            <ul>
              <li><strong>Mon–Fri:</strong> 8 AM–8 PM</li>
              <li><strong>Sat:</strong> 9 AM–5 PM</li>
              <li><strong>Sun:</strong> Closed</li>
            </ul>
          </div>
          <div className="contact-faq">
            <h2>FAQ</h2>
            {faqs.map((item, i) => (
              <div
                className={`contact-faq-item ${faqOpen === i ? 'open' : ''}`}
                key={i}
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              >
                <button className="contact-faq-q">
                  {item.q}
                  <span>{faqOpen === i ? '–' : '+'}</span>
                </button>
                <div className="contact-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
