import React from 'react';
import './MovieCard.css';

interface MovieCardProps {
  image: string;
  title: string;
  duration: string;
  rating: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ image, title, duration, rating }) => {
  return (
    <div className="movie-card">
      <img src={image} alt={title} className="movie-card-image" />
      <div className="movie-card-overlay">
        <h3>{title}</h3>
        <p>Duração: {duration}</p>
        <p>Nota: {rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;