import React, { useEffect, useState } from 'react';
import '../assets/styles/RoomsServicesPage.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ROOMS = [
  {
    id: 1,
    title: 'Deluxe King Suite',
    subtitle: 'Sanctuaries of Comfort & Style',
    description:
      'Each of our guest rooms and suites has been thoughtfully appointed with hand‑picked furnishings, premium linens, and modern amenities to ensure your stay is as restful as it is unforgettable.',
    image: '/assets/images/rooms/room1.jpg',
    features: [
      'King‑ or queen‑size plush bedding',
      'Floor‑to‑ceiling windows with city or sea vistas',
      'En‑suite marble bath with rainfall shower',
      'Complimentary high‑speed Wi‑Fi & smart‑TV',
      '24/7 in‑room dining service',
    ],
  },
  {
    id: 2,
    title: 'Executive Suite',
    subtitle: 'Workspace, Lounge & Views',
    description:
      'A versatile suite featuring a dedicated workspace, separate lounge area, and floor‑to‑ceiling windows to keep you productive and inspired.',
    image: '/assets/images/rooms/room2.jpg',
    features: [
      'Built‑in desk with ergonomic chair',
      'Separate seating area with sofa',
      'Full minibar & coffee station',
      'Smart lighting & thermostat controls',
      'Complimentary access to business lounge',
    ],
  },
  {
    id: 3,
    title: 'Family Room',
    subtitle: 'Spacious & Connected',
    description:
      'Designed for families or groups, enjoy two queen beds, a lounge nook, and extra storage, all within a light‑filled space.',
    image: '/assets/images/rooms/room3.jpg',
    features: [
      'Two queen beds with premium linens',
      'Cozy seating nook with USB charging',
      'In‑room kitchenette for snacks',
      'Smart‑TV with streaming apps',
      'Child‑friendly amenities on request',
    ],
  },
  {
    id: 4,
    title: 'Panorama Studio',
    subtitle: 'Skyline Vistas',
    description:
      'A sleek studio with floor‑to‑ceiling windows offering panoramic city views, perfect for both leisure and work.',
    image: '/assets/images/rooms/room4.jpg',
    features: [
      'Panoramic windows with blackout shades',
      'Compact kitchenette & bar setup',
      'Convertible sofa‑bed option',
      'Bluetooth speaker system',
      'Premium bathrobes & slippers',
    ],
  },
];

export default function RoomsServices() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // trigger entrance animation after mount
    setLoaded(true);
  }, []);

  return (
    <>
    <Navbar/>
      <main className="rs-page mt-5">
        {ROOMS.map((room, i) => (
          <section
            key={room.id}
            className={`rs-section ${loaded ? 'enter' : ''} ${i % 2 === 1 ? 'reverse' : ''
              }`}
          >
            <div
              className="image-wrapper"
              style={{ backgroundImage: `url(${room.image})` }}
            >
              {/* fallback real <img> for mobile */}
              <img src={room.image} alt={room.title} />
            </div>
            <div className="content">
              <h2>{room.title}</h2>
              <p className="subtitle">{room.subtitle}</p>
              <p className="desc">{room.description}</p>
              <ul>
                {room.features.map((f, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check check" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/booking" className="btn-book">
                Book Now
              </a>
            </div>
          </section>
        ))}
      </main>
      <Footer/>
    </>
  );
}
