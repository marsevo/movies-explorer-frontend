import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { cardList } from '../../utils/const';
import Footer from '../Footer/Footer.jsx';

function Movies() {

  return (
    <>
      <Header />
      <section className="movies">
        <SearchForm />
        <MoviesCardList cardList={cardList} />
        <div className="movies__container">
          <button className='movies__button' type="button">Еще</button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Movies;