import { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo-navbar.png';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <div className="logo">
                    <img src={logo} alt="TERRA-NOVA" />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Menu"
                >
                    <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}></span>
                </button>

                {/* Navigation Links */}
                <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
                    <a href="#the-problem" className="nav-link" onClick={closeMobileMenu}>The Problem</a>
                    <a href="#how-it-works" className="nav-link" onClick={closeMobileMenu}>How It Works</a>
                    <a href="#terracube" className="nav-link" onClick={closeMobileMenu}>Terra-Cube</a>
                    <a href="#why-us" className="nav-link" onClick={closeMobileMenu}>Why Us</a>
                    <a href="#pricing" className="nav-link" onClick={closeMobileMenu}>Pricing</a>
                    <a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a>
                </div>
            </div>
        </nav>
    );
}
