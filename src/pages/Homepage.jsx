import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import '../assets/styles/homepage.css'
import ProfilePic from '../../public/assets/images/profilepic.jpg'
import Footer from '../components/Footer';
import RoomPic1 from '../../public/assets/images/rooms/room1.jpg'
import RoomPic2 from '../../public/assets/images/rooms/room2.jpg'
import RoomPic3 from '../../public/assets/images/rooms/room3.jpg'
import RoomPic4 from '../../public/assets/images/rooms/room4.jpg'
import RoomPic5 from '../../public/assets/images/rooms/room5.jpg'
import RoomPic6 from '../../public/assets/images/rooms/room6.jpg'
import RoomPic7 from '../../public/assets/images/rooms/room7.jpg'
import RoomPic8 from '../../public/assets/images/rooms/room8.jpg'
import RoomPic9 from '../../public/assets/images/rooms/room9.jpg'
import RoomPic10 from '../../public/assets/images/rooms/room10.jpg'
import { Link } from 'react-router-dom';

function Homepage() {
    const testimonials = [
        {
            name: 'Sarah M.',
            text: 'A wonderful stay! The staff was incredibly friendly and the atmosphere was peaceful.',
            img: 'https://randomuser.me/api/portraits/women/1.jpg',
            rating: 5,
        },
        {
            name: 'John D.',
            text: 'Beautiful location and excellent service. Highly recommend to anyone visiting the area!',
            img: 'https://randomuser.me/api/portraits/men/2.jpg',
            rating: 4,
        },
        {
            name: 'Emily R.',
            text: 'Rooms were clean and cozy. I appreciated the attention to detail.',
            img: 'https://randomuser.me/api/portraits/women/3.jpg',
            rating: 4,
        },
        {
            name: 'Mark T.',
            text: 'The view from my room was breathtaking. Great value for the price.',
            img: 'https://randomuser.me/api/portraits/men/4.jpg',
            rating: 5,
        },
        {
            name: 'Anna B.',
            text: 'Quiet, charming, and welcoming. Would definitely return.',
            img: 'https://randomuser.me/api/portraits/women/5.jpg',
            rating: 5,
        },
        {
            name: 'David K.',
            text: 'An unforgettable experience. The food, rooms, and service were all top-notch.',
            img: 'https://randomuser.me/api/portraits/men/6.jpg',
            rating: 5,
        },
    ];
    const features = [
        {
            iconClass: 'fa-solid fa-location-dot',
            title: 'Prime Location',
            text: 'Situated in the city center near major attractions.',
        },
        {
            iconClass: 'fa-solid fa-house',
            title: 'Luxury Accommodations',
            text: 'Elegant rooms and suites with high‑end amenities.',
        },
        {
            iconClass: 'fa-solid fa-headset',
            title: 'Exceptional Service',
            text: 'Dedicated staff providing 24/7 concierge support.',
        },
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // 5 seconds

        return () => clearInterval(interval);
    }, []);

    const current = testimonials[index];
    const channels = [
        { key: 'whatsapp', label: 'WhatsApp', link: 'https://wa.me/1234567890', iconClass: 'fab fa-whatsapp' },
        { key: 'facebook', label: 'Facebook', link: 'https://facebook.com/yourpage', iconClass: 'fab fa-facebook-f' },
        { key: 'instagram', label: 'Instagram', link: 'https://instagram.com/yourhandle', iconClass: 'fab fa-instagram' },
        { key: 'phone', label: 'Call Us', link: 'tel:+1234567890', iconClass: 'fas fa-phone-alt' },
    ];

    const textRef = useRef();
    const imgRef = useRef();
    const [visible, setVisible] = useState({ text: false, img: false });

    // Intersection Observer to trigger animations
    useEffect(() => {
        const opts = { threshold: 0.3 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    if (e.target === textRef.current) setVisible(v => ({ ...v, text: true }));
                    if (e.target === imgRef.current) setVisible(v => ({ ...v, img: true }));
                }
            });
        }, opts);

        if (textRef.current) observer.observe(textRef.current);
        if (imgRef.current) observer.observe(imgRef.current);
        return () => observer.disconnect();
    }, []);

    const rooms = [
        {
            title: 'Deluxe Room',
            description: 'Spacious comfort with a king‑size bed & sea view.',
            image: RoomPic1,
        },
        {
            title: 'Executive Suite',
            description: 'Workspace, lounge area, and premium amenities.',
            image: RoomPic2,
        },
        {
            title: 'Family Room',
            description: 'Two queen beds + play area, perfect for families.',
            image: RoomPic3,
        },
        {
            title: 'Standard Room',
            description: 'Cozy & efficient, with all the essentials.',
            image: RoomPic4,
        },
        {
            title: 'Junior Suite',
            description: 'Open‑plan living + bedroom in one elegant space.',
            image: RoomPic5,
        },
        {
            title: 'Presidential Suite',
            description: 'Ultimate luxury: private terrace & butler service.',
            image: RoomPic6,
        },
        {
            title: 'Studio',
            description: 'Compact studio layout with kitchenette.',
            image: RoomPic2,
        },
        {
            title: 'Twin Room',
            description: 'Two single beds, ideal for friends or colleagues.',
            image: RoomPic5,
        },
    ];

    const [indexs, setIndexs] = useState(0);
    const timeoutRef = useRef();
    const delay = 5000;

    // reset and start auto‑slide
    useEffect(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(
            () => setIndexs((prev) => (prev + 1) % rooms.length),
            delay
        );
        return () => clearTimeout(timeoutRef.current);
    }, [indexs]);

    const prev = () => setIndexs((i) => (i - 1 + rooms.length) % rooms.length);
    const next = () => setIndexs((i) => (i + 1) % rooms.length);
    return (
        <div>
            <Navbar />
            {/* Overlay Hero Section */}
            <div class="hero-section">
                <div class="overlay"></div>
                <div class="overlay-content">
                    <h1>Indulge in Timeless<br /> Elegance</h1>
                    <p>City Skyline Serenity ✨<br/>Wake up to the Burj Khalifa from your private balcony. Montage Holiday Homes in Downtown Dubai blend style and comfort for an unforgettable stay.Where’s your next adventure?</p>
                    <div className="d-flex btn-box">
                        <div class="book-btn"><Link to='/booking'>Book Now</Link></div>
                        <div class="rooms-btn"><Link to='/rooms'>Explore Rooms</Link></div>
                    </div>
                </div>
            </div>
            {/* Featured Services Section */}
            <section className="features-section">
                <div className="features-container">
                    {features.map(({ iconClass, title, text }) => (
                        <div className="feature-item" key={title}>
                            <i className={`${iconClass} feature-icon`}></i>
                            <h3 className="feature-title">{title}</h3>
                            <p className="feature-text">{text}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* About Us Section */}
            <section className="about-us">
                <div className="about-us__bg-deco" aria-hidden="true" />
                <div
                    ref={textRef}
                    className={`about-us__text ${visible.text ? 'is-visible' : ''}`}
                >
                    <h2>About <span className="highlight">Montage Holiday Homes</span></h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                        Voluptate, porro asperiores, provident deserunt ut <strong>impedit sunt</strong> error
                        pariatur, excepturi tempora aspernatur velit perferendis.
                    </p>
                </div>

                <div
                    ref={imgRef}
                    className={`about-us__image ${visible.img ? 'is-visible' : ''}`}
                >
                    <img src={ProfilePic} alt="Our founder smiling" loading="lazy" />
                </div>
            </section>
            {/* Rooms Sections */}
            {/* Rooms Section: REPLACE ENTIRE BLOCK BELOW */}
            <section className="rooms-section">
                {/* Creative background shape */}
                <div className="rooms-deco" aria-hidden="true" />

                <h2 className="rooms-title">Explore Our Room Types</h2>

                <div className="carousel" style={{ perspective: '1000px' }}>
                    {/* Previous Arrow */}
                    <button className="nav prev" onClick={prev} aria-label="Previous room">
                        <i className="fas fa-chevron-left" />
                    </button>

                    {/* Viewport */}
                    <div className="slide-window">
                        <div
                            className="slides"
                            style={{ transform: `translateX(-${indexs * 100}%)` }}
                        >
                            {rooms.map((room, idx) => (
                                <div className="room-card" key={idx}>
                                    <div className="image-wrap">
                                        <img src={room.image} alt={room.title} loading="lazy" />
                                    </div>
                                    <div className="room-info">
                                        <h3>{room.title}</h3>
                                        <p>{room.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Arrow */}
                    <button className="nav next" onClick={next} aria-label="Next room">
                        <i className="fas fa-chevron-right" />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="dots">
                    {rooms.map((_, idx) => (
                        <button
                            key={idx}
                            className={`dot ${idx === indexs ? 'active' : ''}`}
                            onClick={() => setIndexs(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <a href="/rooms" className="see-more-btn">
                    See More Rooms &amp; Services
                </a>
            </section>
            {/* END Rooms Section */}

            {/* Testimonial Section */}
            <div className="carousel-container">
                <h2 className="carousel-title">Guest Testimonials</h2>
                <div className="testimonial-card">
                    <img className="avatar" src={current.img} alt={current.name} />
                    <div className="testimonial-content">
                        <div className="name-rating">
                            <span className="name">{current.name}</span>
                            <span className="stars">
                                {'★'.repeat(current.rating)}
                                {'☆'.repeat(5 - current.rating)}
                            </span>
                        </div>
                        <p className="review-text">{current.text}</p>
                    </div>
                </div>
            </div>
            {/* Get-in-touch Section */}
            <section className="touch-section">
                <div className="touch-header">
                    <span className="accent-line" />
                    <h2>Get in Touch With Us</h2>
                    <p>We’d love to hear from you — choose your preferred channel below.</p>
                </div>

                <div className="touch-grid">
                    {channels.map((ch) => (
                        <a
                            key={ch.key}
                            href={ch.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="touch-card"
                        >
                            <div className="icon-circle">
                                <i className={ch.iconClass} aria-hidden="true"></i>
                            </div>
                            <span className="touch-label">{ch.label}</span>
                        </a>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Homepage
