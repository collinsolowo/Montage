import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/RoomsServicesPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    id: 'rooms',
    title: 'Luxurious Rooms',
    subtitle: 'Sanctuaries of Comfort & Style',
    img: '/assets/images/room.jpg',
    desc: `Each of our guest rooms and suites has been thoughtfully appointed 
      with hand‑picked furnishings, premium linens, and modern amenities 
      to ensure your stay is as restful as it is unforgettable.`,
    features: [
      'King‑ or queen‑size plush bedding',
      'Floor‑to‑ceiling windows with city or sea vistas',
      'En‑suite marble bath with rainfall shower',
      'Complimentary high‑speed Wi‑Fi & smart‑TV',
      '24/7 in‑room dining service'
    ],
    itemToBook: { name: 'Deluxe King Suite', price: '$250/night', image: '/assets/images/room.jpg' }
  },
  {
    id: 'kitchen',
    title: 'Gourmet Kitchen',
    subtitle: 'Epicurean Delights Await',
    img: '/assets/images/kitchen.jpg',
    desc: `Our signature kitchen experiences marry global flavors with 
      locally sourced ingredients—whether you crave a chef’s tasting menu, 
      an alfresco BBQ, or a private dining affair for up to ten guests.`,
    features: [
      'Chef’s tasting menu curated daily',
      'Private dining rooms with personalized service',
      'Open‑air BBQ pavilion under the stars',
      'Customizable group menus & wine pairings',
      '24/7 room service from our kitchen'
    ],
    itemToBook: { name: '24/7 Chef’s Table', price: 'À la carte', image: '/assets/images/kitchen.jpg' }
  },
  {
    id: 'pools',
    title: 'Infinity Pools',
    subtitle: 'Swim Above the Horizon',
    img: '/assets/images/pool.jpg',
    desc: `Dive into panoramic vistas from our infinity decks, 
      lounge in the family lagoon, or unwind in our heated spa and 
      sauna—every pool is a private oasis elevated by bespoke service.`,
    features: [
      'Rooftop infinity deck with skyline view',
      'Family‑friendly lagoon‑style pool',
      'Heated spa jets & steam room access',
      'Swim‑up tiki bar with signature cocktails',
      'Poolside cabanas with dedicated attendants'
    ],
    itemToBook: { name: 'Rooftop Infinity Deck', price: 'Free access', image: '/assets/images/pool.jpg' }
  },
  {
    id: 'facilities',
    title: 'World‑class Facilities',
    subtitle: 'All You Desire, On‑site',
    img: '/assets/images/facility.jpg',
    desc: `From a cutting‑edge fitness center and serene wellness spa 
      to a business lounge equipped for every meeting, our facilities 
      cater to every aspect of your lifestyle—leisure, wellness, and work.`,
    features: [
      '24/7 state‑of‑the‑art gym & personal trainers',
      'Full‑service wellness spa & treatment rooms',
      'Business & co‑working lounge with private pods',
      'Kids’ play zone & VR arcade',
      'Concierge, laundry & valet services'
    ],
    itemToBook: { name: 'State‑of‑the‑Art Gym', price: 'Free access', image: '/assets/images/facility.jpg' }
  }
];

export default function RoomsServicesPage() {
  const [visible, setVisible] = useState({});
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisible(v => ({ ...v, [e.target.id]: true }));
            observer.current.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) observer.current.observe(el);
    });
    return () => observer.current.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className="rs-page">
        {sections.map((sec, idx) => (
          <section
            key={sec.id}
            id={sec.id}
            className={`rs-section ${idx % 2 ? 'reverse' : ''} ${visible[sec.id] ? 'enter' : ''}`}
            style={{ backgroundImage: `url(${sec.img})` }}
          >
            <div className="overlay" />
            <div className="content">
              <h2>{sec.title}</h2>
              <p className="subtitle">{sec.subtitle}</p>
              <p className="desc">{sec.desc}</p>
              <ul>
                {sec.features.map((feat, i) => (
                  <li key={i}>
                    <svg className="check" viewBox="0 0 20 20">
                      <polyline points="4 11 8 15 16 5" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                to="/booking"
                state={{ item: sec.itemToBook }}
                className="btn-book"
              >
                Book Now — {sec.itemToBook.name}
              </Link>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
