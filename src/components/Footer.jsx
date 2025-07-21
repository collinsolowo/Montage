import React from 'react';
import '../assets/styles/Footer.css';
import MontageLogo from '../../public/assets/logos/montage Logo.png'

const quickLinks = [
  { label: 'Home', href: '/home' },
  { label: 'Rooms & Services', href: '/rooms' },
  { label: 'Bookings', href: '/booking' },
  { label: 'Contact Us', href: '/contact' },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://web.facebook.com/profile.php?id=61578370253699', iconClass: 'fab fa-facebook-f' },
  { label: 'Instagram', href: 'https://www.instagram.com/montageholidayhomes/', iconClass: 'fab fa-instagram' },
  { label: 'WhatsApp', href: 'https://wa.me/+971589355788', iconClass: 'fab fa-whatsapp' },
  { label: 'Phone', href: 'tel:++971589355788', iconClass: 'fas fa-phone-alt' },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      {/* 1. Brand & About */}
      <div className="footer-col">
        <img src={MontageLogo} alt="Montage Logo" className="footer-logo" />
        <p className="footer-about">
          Montage Holiday Homes / Hotel Apartments offers you a blend of comfort and luxury, nestled in scenic locales. Your stay is our promise of excellence.
        </p>
      </div>

      {/* 2. Quick Links */}
      <div className="footer-col">
        <h4>Quick Links</h4>
        <ul className="footer-links">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Contact Info */}
      <div className="footer-col">
        <h4>Contact Us</h4>
        <p><i className="fas fa-map-marker-alt"></i>Montage Holiday Homes Rental LLc<br/> 9th Floor, Office 13,<br/> Citibank Building,<br/> Umm e Hurair Second,<br/> Dubai Medica City</p>
        <p><i className="fas fa-phone-alt"></i> +971589355788</p>
        <p><i className="fas fa-envelope"></i>montageholidayshomesllc@gmail.com</p>
      </div>

      {/* 4. Newsletter & Socials */}
      <div className="footer-col">
        <h4>Stay in Touch</h4>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Email for newsletter"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        <div className="socials">
          {socialLinks.map((soc) => (
            <a
              key={soc.label}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={soc.label}
            >
              <i className={soc.iconClass}></i>
            </a>
          ))}
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Montage Holiday Homes / Hotel Apartments. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
