import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/styles/BookingPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import sections from '../data/sections';

export default function BookingPage() {
  const location = useLocation();
  const flatItems = sections.flatMap(sec => sec.items);
  const defaultItem = flatItems[0];
  const [selected, setSelected] = useState(location.state?.item || defaultItem);
  const [form, setForm] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    notes: ''
  });

  // Ref to the form area for smooth scrolling
  const formRef = useRef(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const composeMessage = () => {
    return `
Booking Request:
• Room/Service: ${selected.name}
• Price: ${selected.price}
• Availability: ${selected.availability}

Guest Details:
• Name: ${form.name}
• Email: ${form.email}
• Check‑in: ${form.checkIn}
• Check‑out: ${form.checkOut}
• Guests: ${form.guests}
• Notes: ${form.notes}
    `.trim();
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(`Booking Request: ${selected.name}`);
    const body = encodeURIComponent(composeMessage());
    window.location.href = `mailto:reservations@yourhotel.com?subject=${subject}&body=${body}`;
  };

  const sendWhatsApp = () => {
    const msg = encodeURIComponent(composeMessage());
    window.open(`https://wa.me/2348012345678?text=${msg}`, '_blank');
  };

  // Check all required fields
  const isValid = form.name && form.email && form.checkIn && form.checkOut && form.guests > 0;

  return (
    <>
      <Navbar />
      <main className="booking-page luxe">
        <section
          className="hero"
          style={{ backgroundImage: `url(${selected.image})` }}
        >
          <div className="dark-overlay" />
          <div className="hero-content">
            <h1>Reserve Your {selected.name}</h1>
            <p>{selected.details}</p>
            <button
              className="btn-choose"
              onClick={() => formRef.current.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Now <i className="fas fa-chevron-down" />
            </button>
          </div>
        </section>

        <section className="booking-body" ref={formRef}>
          <aside className="sidebar">
            <h2>Your Selection</h2>
            <ul>
              {flatItems.map(item => (
                <li
                  key={item.name}
                  className={item.name === selected.name ? 'active' : ''}
                  onClick={() => setSelected(item)}
                >
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <div className="form-area">
            <div className="details-preview">
              <h3>{selected.name}</h3>
              <p className="price">{selected.price}</p>
              <p>{selected.availability}</p>
              <p>{selected.details}</p>
            </div>

            <form className="booking-form" onSubmit={e => e.preventDefault()}>
              <label>
                Full Name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email Address
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="dates">
                <label>
                  Check‑in
                  <input
                    name="checkIn"
                    type="date"
                    value={form.checkIn}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Check‑out
                  <input
                    name="checkOut"
                    type="date"
                    value={form.checkOut}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <label>
                Guests
                <input
                  name="guests"
                  type="number"
                  min="1"
                  value={form.guests}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Special Requests
                <textarea
                  name="notes"
                  rows="4"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Allergies, late arrival…"
                />
              </label>
            </form>

            <div className="action-buttons">
              <button
                className="btn-send"
                onClick={sendEmail}
                disabled={!isValid}
              >
                <i className="fas fa-envelope"></i> Send Request (Email)
              </button>
              <button
                className="btn-send whatsapp"
                onClick={sendWhatsApp}
                disabled={!isValid}
              >
                <i className="fab fa-whatsapp"></i> Send via WhatsApp
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
