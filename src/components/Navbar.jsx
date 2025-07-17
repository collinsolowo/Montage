import React from 'react'
import MontageLogo from '../../public/assets/logos/montage Logo.png'
import '../assets/styles/navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
    function showNav() {
        const navItems = document.querySelector('.nav-items')
        navItems.classList.toggle('show-nav')
    }
    return (
        <div>
            {/* Navbar */}
            <div className="navbar d-flex flex-row p-2 justify-content-evenly align-items-center">
                {/* NavLogo */}
                <div className="nav-logo"><img src={MontageLogo} alt="Montage Logo" /></div>
                {/* Nav Items */}
                <div className="nav-items d-flex flex-row justify-content-evenly align-items-center">
                    <Link className="nav-links" to="/home">Home</Link>
                    <Link className="nav-links" to="/rooms">Rooms & Services</Link>
                    <Link className="nav-links" to="/booking">Bookings</Link>
                    <Link className="nav-links" to="/contact">Contact Us</Link>
                </div>
                {/* Nav Btn */}
                <div className="btn-tools d-flex flex-row ">
                    <i className="fa-solid fa-bars hamburger mt-2" onClick={showNav}></i>
                    <div className="nav-btn">Book a Room</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
