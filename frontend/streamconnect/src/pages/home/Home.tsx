import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section id="home">
        <Container className="h-100 d-flex align-items-center justify-content-center">
          <Row>
            <Col md={12} className="text-center">
              <h1 className="display-1 mb-4">Bem-vindo ao StreamConnect</h1>
              <div className="d-flex justify-content-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="btn-custom btn-roxo"
                  onClick={() => navigate('/signin')}
                >
                  Sign In
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="btn-custom btn-branco"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;