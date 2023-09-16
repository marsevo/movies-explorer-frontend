import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cardList, isSavedPage }) {

  return (
    <section className="movies-card">
      <ul className="movies-card__list">
        {cardList.map((card) => (
          <MoviesCard
            key={card.movieId}
            movieId={card.movieId}
            duration={card.duration}
            image={card.image}
            name={card.nameRU}
            isSavedPage={isSavedPage}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
