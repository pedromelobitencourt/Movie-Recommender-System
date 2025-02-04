import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import MovieCard from '../../components/movieCard/MovieCard';
import { MDBContainer } from "mdb-react-ui-kit";
import './Catalog.css';

const Catalog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="catalog-container">
      <section id="catalog">
      <div className="catalog-header">
        <h1 className="display-1 mb-4">Filmes no catálogo</h1>
        <MDBContainer className="py-5">
          <input
            type="text"
            className="search-hover"
            placeholder="Busque pelo filme..."
          />
        </MDBContainer>
      </div>
      <Row className="movie-cards-row">
        <Col>
          <MovieCard
            image="https://via.placeholder.com/200x300"
            title="Filme 1"
            duration="2h 30m"
            rating="8.5"
          />
        </Col>
        <Col>
          <MovieCard
            image="https://via.placeholder.com/200x300"
            title="Filme 2"
            duration="1h 45m"
            rating="7.8"
          />
        </Col>
        {/* Adicione mais MovieCard conforme necessário */}
      </Row>
      <h2>Filmes recomendados</h2>
      <Row className="movie-cards-row">
        <Col>
          <MovieCard
            image="https://via.placeholder.com/200x300"
            title="Filme 1"
            duration="2h 30m"
            rating="8.5"
          />
        </Col>
        <Col>
          <MovieCard
            image="https://via.placeholder.com/200x300"
            title="Filme 2"
            duration="1h 45m"
            rating="7.8"
          />
        </Col>
        {/* Adicione mais MovieCard conforme necessário */}
      </Row>
      
      </section>
    </div>
  );
};

export default Catalog;