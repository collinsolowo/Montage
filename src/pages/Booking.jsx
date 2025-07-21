/* ===== BookingPage.jsx ===== */
import React, { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/BookingPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Studio definitions with base $6000 price and slight variations
const STUDIOS = [
  { id: 1, name: 'Silk Studio', image: '/assets/images/rooms/room1.jpg', price: 6000, desc: 'Elegant open-plan loft with silken drapes and city views.' },
  { id: 2, name: 'Luxe Studio', image: '/assets/images/rooms/room2.jpg', price: 6050, desc: 'Modern design, plush bedding & full kitchenette for a seamless stay.' },
  { id: 3, name: 'Aura Studio', image: '/assets/images/rooms/room3.jpg', price: 6100, desc: 'Ambient lighting, neutral palette, and panoramic skyline vistas.' },
  { id: 4, name: 'Panorama Studio', image: '/assets/images/rooms/room4.jpg', price: 6150, desc: 'Floor-to-ceiling windows with breathtaking cityscape views.' },
];

export default function BookingPage() {
  const [selected, setSelected] = useState(STUDIOS[0]);
  const [form, setForm] = useState({ name: '', email: '', checkIn: '', checkOut: '', guests: 1, notes: '' });
  const formRef = useRef(null);
  const isValid = form.name && form.email && form.checkIn && form.checkOut && form.guests > 0;

  // Scroll into view on mount
  useEffect(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const composeMessage = () => `Booking for ${selected.name} ($${selected.price}):\n
Name: ${form.name}\nEmail: ${form.email}\nCheck-in: ${form.checkIn}\nCheck-out: ${form.checkOut}\nGuests: ${form.guests}\nNotes: ${form.notes}`;

  const sendEmail = () => {
    emailjs.send(
      'service_jjojahx',              // your EmailJS service ID
      'template_n01nsve',             // your EmailJS template ID
      {
        title: selected.name,                      // fills {{title}}
        message: composeMessage(),                 // fills {{message}}
        // optional: also pass name & email if your template needs them:
        name: form.name,
        email: form.email,
      },
      'KErAqjhkVAtN97kkX'             // your EmailJS user key
    ).then(() => {
      toast.success('Booking request sent! We will contact you shortly.');
      setForm({ name: '', email: '', checkIn: '', checkOut: '', guests: 1, notes: '' });
    }).catch(() => toast.error('Oops! Could not send.'));
  };

  const sendWhatsApp = () => {
    const msg = encodeURIComponent(composeMessage());
    window.open(`https://wa.me/+971589355788?text=${msg}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" />
      <main className="booking-page silk-classy">

        {/* Hero */}
        <section className="hero" style={{ backgroundImage: `url(${selected.image})` }}>
          <div className="overlay" />
          <div className="hero-content">
            <h1>Reserve Your {selected.name}</h1>
            <p>{selected.desc}</p>
            <button className="btn" onClick={() => formRef.current.scrollIntoView({ behavior: 'smooth' })}>
              Book Now <i className="fas fa-chevron-down" />
            </button>
          </div>
        </section>

        {/* Selection & Form */}
        <section className="body" ref={formRef}>
          <aside className="selection">
            <h2>Select Your Studio</h2>
            <ul>
              {STUDIOS.map(studio => (
                <li key={studio.id} className={studio.id === selected.id ? 'active' : ''} onClick={() => setSelected(studio)}>
                  <img src={studio.image} alt={studio.name} />
                  <div>
                    <strong>{studio.name}</strong>
                    <span>${studio.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <div className="form-wrap">
            <div className="preview">
              <h3>{selected.name}</h3>
              <p className="price">${selected.price}</p>
              <p>{selected.desc}</p>
            </div>

            <form className="form" onSubmit={e => e.preventDefault()}>
              <label>Name<input name="name" value={form.name} onChange={handleChange} required /></label>
              <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
              <div className="dates">
                <label>Check-in<input name="checkIn" type="date" value={form.checkIn} onChange={handleChange} required /></label>
                <label>Check-out<input name="checkOut" type="date" value={form.checkOut} onChange={handleChange} required /></label>
              </div>
              <label>Guests<input name="guests" type="number" min="1" value={form.guests} onChange={handleChange} required /></label>
              <label>Special Requests<textarea name="notes" rows="4" value={form.notes} onChange={handleChange} placeholder="Any preferences or needs…" /></label>
            </form>

            <div className="actions">
              <button className="btn-email" onClick={sendEmail} disabled={!isValid}>
                <i className="fas fa-envelope" /> Send via Email
              </button>
              <button className="btn-wa" onClick={sendWhatsApp} disabled={!isValid}>
                <i className="fab fa-whatsapp" /> Send via WhatsApp
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}