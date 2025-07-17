import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/RoomsServicesPage.css';
import roomImg from '../../public/assets/images/room.jpg';
import kitchenImg from '../../public/assets/images/kitchen.jpg';
import poolImg from '../../public/assets/images/pool.jpg';
import facilityImg from '../../public/assets/images/facility.jpg';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const sections = [
  {
    id: 'rooms',
    title: 'Luxurious Rooms',
    subtitle: 'Sanctuaries of comfort & style',
    img: roomImg,
    items: [
      { name: 'Deluxe King Suite', price: '$250/night', availability: '5 rooms left', details: 'King bed, city view, minibar & free Wi‑Fi.', image: roomImg },
      // …additional fields if you like
    ],
  },
  {
    id: 'kitchen',
    title: 'Gourmet Kitchen',
    subtitle: 'Culinary delights around the clock',
    img: kitchenImg,
    items: [
      { name: '24/7 Chef’s Table', price: 'À la carte', availability: 'Open', details: 'Customized tasting menu by our head chef.', image: kitchenImg },
    ],
  },
  {
    id: 'pools',
    title: 'Infinity Pools',
    subtitle: 'Swim with a view of the horizon',
    img: poolImg,
    items: [
      { name: 'Rooftop Infinity Deck', price: 'Free access', availability: 'Open daily', details: 'Sun loungers & cocktail service.', image: poolImg },
    ],
  },
  {
    id: 'facilities',
    title: 'World‑class Facilities',
    subtitle: 'Everything you need, and more',
    img: facilityImg,
    items: [
      { name: 'State‑of‑the‑Art Gym', price: 'Free access', availability: '24/7', details: 'Cardio, weights & personal trainers.', image: facilityImg },
    ],
  },
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
              <ul>
                {sec.items.map(it => (
                  <li key={it.name}>
                    <svg className="check" viewBox="0 0 20 20">
                      <polyline points="4 11 8 15 16 5" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {it.name}
                  </li>
                ))}
              </ul>
              {/* Book Now button links to /booking, passing the first item */}
              <Link
                to="/booking"
                state={{ item: sec.items[0] }}
                className="btn-book"
              >
                Book Now
              </Link>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
