import React, { useEffect, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Hooks/UseAuth';
import './HeaderStyle.css';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleClickLogout = () => {
    logout();
  };

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
        expand="md"
        fixed="top"
        className={`navbar-transparente ${scrolled ? 'scrolled' : ''}`}
      >
        <Container className="header-container">
          <Navbar.Brand href={user ? "/catalog" : "/"}>
            <img src="/images/logo.png" width="68" alt="Logo" />
          </Navbar.Brand>

          <h1 className="text">StreamConnect</h1>

          {user && (
            <div className="menu-container">
              <FontAwesomeIcon
                icon={faBars}
                className="menu-icon text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {/* Menu dropdown */}
              {menuOpen && (
                <div className="menu-dropdown">
                  <button onClick={handleClickLogout} className="menu-item">
                    <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" /> Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
