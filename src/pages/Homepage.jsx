import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import '../assets/styles/homepage.css'
import ProfilePic from '../../public/assets/images/profilepic.jpg'
import Footer from '../components/Footer';
import RoomPic1 from '../../public/assets/images/rooms/room1.jpg'
import RoomPic2 from '../../public/assets/images/BG1.jpeg'
import RoomPic3 from '../../public/assets/images/BG2.jpeg'
import RoomPic4 from '../../public/assets/images/rooms/room4.jpg'
import RoomPic5 from '../../public/assets/images/BG2.jpeg'
import RoomPic6 from '../../public/assets/images/BG1.jpeg'
import RoomPic7 from '../../public/assets/images/rooms/room7.jpg'
import RoomPic8 from '../../public/assets/images/rooms/room8.jpg'
import RoomPic9 from '../../public/assets/images/rooms/room9.jpg'
import RoomPic10 from '../../public/assets/images/rooms/room10.jpg'
import { Link } from 'react-router-dom';

const SLIDES = [
    {
        title: 'About Us',
        text: `Montage Holiday Homes Rental LLC is a premier short-term Property Rental Management Company based in the UAE. We specialize in curating exceptional holiday home experiences for travelers; offering stylish, fully furnished apartments and villas in prime locations across Dubai and beyond. Our services cater to tourists, business travelers, and staycationers looking for flexible, luxurious, and convenient accommodations with a “home away from home” feeling.`,
        image: '/assets/images/profilepic.jpg',  // placeholder; swap to real profile pic as needed
    },
    {
        title: 'Mission Statement',
        text: `To redefine short-term rentals by providing guests with premium, personalized, and seamless holiday home experiences while delivering outstanding property management solutions that empower owners and maximize profitability.`,
        image: '/assets/images/overlay.jpg',
    },
    {
        title: 'Vision Statement',
        text: `To become the most trusted and innovative holiday home brand in the UAE, known for exceptional services, curated stays, and a commitment to excellence for both guests and property partners.`,
        image: '/assets/images/facility.jpg',
    },
];

const HERO_SLIDES = [
    {
        img: '/assets/images/BG1.jpeg',
        heading: <>Indulge in Timeless<br />Elegance</>,
        subtext: `City Skyline Serenity ✨
Wake up to the Burj Khalifa from your private balcony. Montage Holiday Homes in Downtown Dubai blend style and comfort for an unforgettable stay. Where’s your next adventure?`,
    },
    {
        img: '/assets/images/BG2.jpeg',   // your second image in public/assets/images
        heading: <>Welcome to Luxury Escape</>,
        subtext: `to a world of elegance with Montage Holiday Homes. Our stunning villas in Dubai’s iconic Palm Jumeirah offer private pools and breathtaking views. Book your dream getaway today!

#DubaiLuxury #MontageHolidayHomes #LuxuryVillas #PalmJumeirah #TravelDubai #LuxuryTravel #VacationGoals #HolidayHomes`,
    },
];


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
        { key: 'whatsapp', label: 'WhatsApp', link: 'https://wa.me/+971589355788', iconClass: 'fab fa-whatsapp' },
        { key: 'facebook', label: 'Facebook', link: 'https://web.facebook.com/profile.php?id=61578370253699', iconClass: 'fab fa-facebook-f' },
        { key: 'instagram', label: 'Instagram', link: 'https://www.instagram.com/montageholidayhomes/', iconClass: 'fab fa-instagram' },
        { key: 'phone', label: 'Call Us', link: 'tel:+971589355788', iconClass: 'fas fa-phone-alt' },
    ];

    const textRef = useRef();
    const imgRef = useRef();
    const [visible, setVisible] = useState({ text: false, img: false });

    const [slide, setSlide] = useState(0);
    const timeoutRef = useRef(null);

    // Auto-rotate every 7s
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setSlide((s) => (s + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearTimeout(timeoutRef.current);
    }, [slide]);

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

    const [idx, setIdx] = useState(0);
    const timer = useRef();

    // Auto-advance every 5 seconds
    useEffect(() => {
        timer.current = setTimeout(() => {
            setIdx(i => (i + 1) % SLIDES.length);
        }, 5000);
        return () => clearTimeout(timer.current);
    }, [idx]);

    const rooms = [
        {
            title: '',
            description: 'Stylish open-plan space with plush bedding, private balcony & full kitchenette.',
            image: RoomPic1,
        },
        {
            title: '',
            description: 'Panoramic Dubai skyline views, modern interiors, and seamless design.',
            image: RoomPic2,
        },
        {
            title: '',
            description: 'Steps from the beach, this studio features neutral tones & ocean light.',
            image: RoomPic3,
        },
        {
            title: '',
            description: 'High-rise privacy meets cozy design. Ideal for solo stays or business trips.',
            image: RoomPic4,
        },
        {
            title: '',
            description: 'Private balcony, high-speed Wi-Fi, luxury linens & smart-TV — all-in-one.',
            image: RoomPic5,
        },
        {
            title: '',
            description: 'Bright corner layout with extended windows and fully equipped kitchen.',
            image: RoomPic6,
        },
    ];


    const [indexs, setIndexs] = useState(0);
    const htimeoutRef = useRef();
    const delay = 5000;

    // reset and start auto‑slide
    useEffect(() => {
        clearTimeout(htimeoutRef.current);
        htimeoutRef.current = setTimeout(
            () => setIndexs((prev) => (prev + 1) % rooms.length),
            delay
        );
        return () => clearTimeout(htimeoutRef.current);
    }, [indexs]);

    const prev = () => setIndexs((i) => (i - 1 + rooms.length) % rooms.length);
    const next = () => setIndexs((i) => (i + 1) % rooms.length);
    return (
        <div>
            <Navbar />
            {/* Overlay Hero Section */}
            <div className="hero-carousel">
                {HERO_SLIDES.map((s, i) => (
                    <div
                        key={i}
                        className={`hero-slide ${i === slide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${s.img})` }}
                    >
                        <div className="overlay" />
                        <div className="overlay-content">
                            <h1>{s.heading}</h1>
                            <p>{s.subtext}</p>
                            <div className="btn-box">
                                <Link to="/booking" className="book-btn">Book Now</Link>
                                <Link to="/rooms" className="rooms-btn">Explore Studios</Link>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="hero-dots">
                    {HERO_SLIDES.map((_, idx) => (
                        <button
                            key={idx}
                            className={`dot ${idx === slide ? 'active' : ''}`}
                            onClick={() => {
                                clearTimeout(timeoutRef.current);
                                setSlide(idx);
                            }}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
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
            <div className="about-carousel">
                {SLIDES.map((s, i) => (
                    <div
                        key={i}
                        className={`about-slide ${i === idx ? 'active' : ''}`}
                    >
                        <div className="about-text">
                            <h2>{s.title}</h2>
                            <p>{s.text}</p>
                        </div>
                        <div className="about-image">
                            <img src={s.image} alt={s.title} />
                        </div>
                    </div>
                ))}

                <div className="about-dots">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === idx ? 'active' : ''}`}
                            onClick={() => {
                                clearTimeout(timer.current);
                                setIdx(i);
                            }}
                            aria-label={`Go to ${SLIDES[i].title}`}
                        />
                    ))}
                </div>
            </div>
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

                <Link to="/rooms" className="see-more-btn">
                    See More Rooms &amp; Services
                </Link>
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
