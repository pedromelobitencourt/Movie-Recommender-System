import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './style/HeaderStyle.css';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
        <Container>
          <Navbar.Brand href="/">
            <img src="/images/logo.png" width="68" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-principal">
            <FontAwesomeIcon icon={faBars} className="text-white" />
          </Navbar.Toggle>
          <Navbar.Collapse id="nav-principal">
            <Nav className="ml-auto">
              <Nav.Link href="/" className="nav-link">Home</Nav.Link>
              <Nav.Link href="#" className="nav-link">Ajuda</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;