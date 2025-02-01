import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg="transparent" expand="md" fixed="top" className="navbar-transparente">
        <Container>
          <Navbar.Brand href="/">
            <img src="/imagens/logo.png" width="68" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-principal">
            <FontAwesomeIcon icon={faBars} className="text-white" />
          </Navbar.Toggle>
          <Navbar.Collapse id="nav-principal">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#">Ajuda</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;