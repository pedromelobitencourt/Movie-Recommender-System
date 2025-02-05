import React, { useEffect, useState, useRef } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faHome, faFilm } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Hooks/UseAuth';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderStyle.css';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/signin');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <Navbar
        bg="transparent"
        expand="lg"
        fixed="top"
        className={`navbar-transparente ${scrolled ? 'scrolled' : ''}`}
      >
        <Container className="header-container">
          <Navbar.Brand as={Link} to="/" className="brand-container">
            <img src="/images/logo.png" alt="StreamConnect Logo" className="brand-logo" />
            <span className="brand-text">StreamConnect</span>
          </Navbar.Brand>

          <Nav className="main-navigation">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/catalog" className="nav-link">
                  <FontAwesomeIcon icon={faFilm} className="nav-icon" />
                  Catalog
                </Nav.Link>
                <Nav.Link as={Link} to="/" className="nav-link">
                  <FontAwesomeIcon icon={faHome} className="nav-icon" />
                  Home
                </Nav.Link>
              </>
            )}
          </Nav>

          {isAuthenticated && (
            <div className="menu-container" ref={menuRef}>
              <button 
                className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="User menu"
              >
                <FontAwesomeIcon icon={faBars} className="menu-icon" />
              </button>

              <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
                <div className="user-info">
                  <span className="user-email">{user?.email}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="menu-item"
                  aria-label="Logout"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="menu-item-icon" />
                  <span className="menu-item-text">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;