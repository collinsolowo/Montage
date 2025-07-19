import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/contactpage.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const SOCIALS = [
  { key: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/+2348139386017', icon: 'fab fa-whatsapp' },
  { key: 'facebook', label: 'Facebook', url: 'https://web.facebook.com/profile.php?id=61578370253699', icon: 'fab fa-facebook-f' },
  { key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/montageholidayhomes/', icon: 'fab fa-instagram' },
  { key: 'phone', label: 'Call Us', url: 'tel:+23448139386017', icon: 'fas fa-phone-alt' },
];

const LOCATIONS = [
  { name: 'Jumeirah Lake Towers (JLT)', query: 'Jumeirah+Lake+Towers+Dubai' },
  { name: 'Downtown Dubai', query: 'Downtown+Dubai' },
  { name: 'Business Bay', query: 'Business+Bay+Dubai' },
  { name: 'Jumeirah Village Circle (JVC)', query: 'Jumeirah+Village+Circle+Dubai' },
  { name: 'Jumeirah Beach Residence (JBR)', query: 'Jumeirah+Beach+Residence+Dubai' },
  { name: 'Dubai Marina', query: 'Dubai+Marina' },
];

const FAQS = [
  { q: 'What is your cancellation policy?', a: 'Cancellation is free if done at least 5 days before check‑in date.' },
  { q: 'Do you allow pets?', a: 'No—pets are not allowed in any of our accommodations.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [faqOpen, setFaqOpen] = useState(null);
  const formRef = useRef();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Word count for message
  const wordCount = form.message.trim().split(/\s+/).filter(w => w).length;

  // Valid when all fields non-empty & message >= 50 words
  const isValid = Object.values(form).every(v => v.trim()) && wordCount >= 50;

  const handleSubmit = e => {
    e.preventDefault();
    // simple front validation
    const errs = {};
    ['name', 'email', 'subject', 'message'].forEach(f => {
      if (!form[f].trim()) errs[f] = 'Required';
    });
    if (wordCount < 50) errs.message = 'Please reach at least 50 words';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Send via EmailJS
    emailjs.send(
      'service_jjojahx',
      'template_qq2a3jz',
      {
        title: form.subject,     // matches {{title}}
        name: form.name,         // matches {{name}}
        email: form.email,       // matches {{email}}
        message: form.message,   // matches {{message}}
      },
      'KErAqjhkVAtN97kkX'
    ).then(
      () => {
        toast.success('Message sent successfully!', { autoClose: 5000 });
        setForm({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      },
      err => {
        console.error(err);
        toast.error('Oops! Something went wrong.', { autoClose: 5000 });
      }
    );
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" />
      <main className="contact-main">
        {/* Hero */}
        <section className="contact-hero">
          <div className="contact-hero-deco" aria-hidden="true" />
          <h1 className="contact-hero-title">Get in Touch With Us</h1>
          <p className="contact-hero-sub">
            Questions? Feedback? We’re here 24/7 — no holidays in hospitality.
          </p>
        </section>

        {/* Socials */}
        <section className="contact-socials">
          {SOCIALS.map(s => (
            <a key={s.key} href={s.url} className="contact-social-card" target="_blank" rel="noopener">
              <div className="contact-icon-circle"><i className={s.icon} /></div>
              <span>{s.label}</span>
            </a>
          ))}
        </section>

        {/* Form */}
        <section className="contact-form-section">
          <h2 className="contact-form-title">Send Us a Message</h2>
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
            {['name', 'email', 'subject'].map(field => (
              <div className="contact-form-group" key={field}>
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  id={field}
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
              <label htmlFor="message">
                Message (50+ words: {wordCount})
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                className={errors.message ? 'contact-invalid' : ''}
              />
              {errors.message && <small className="contact-error">{errors.message}</small>}
            </div>

            <button
              type="submit"
              className="contact-btn-submit"
              disabled={!isValid}
            >
              Send Message
            </button>
          </form>
        </section>
        {/* Locations */}
        <section className="contact-locations">
          <h2 className="contact-locations-title">Our Locations</h2>
          <div className="contact-locations-grid">
            {LOCATIONS.map(loc => (
              <div className="contact-loc-card" key={loc.name}>
                <h3>{loc.name}</h3>
                <iframe
                  src={`https://www.google.com/maps?q=${loc.query}&output=embed`}
                  title={loc.name}
                  loading="lazy"
                  className="contact-map-embed"
                />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${loc.query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-loc-btn"
                >
                  Get Directions
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Support Hours & FAQ */}
        <section className="contact-faq-section">
          <div className="contact-hours">
            <h2>Support Hours</h2>
            <p>Open 24 hours, all days of the week — no holidays in hospitality.</p>
          </div>
          <div className="contact-faq">
            <h2>FAQ</h2>
            {FAQS.map((item, i) => (
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
