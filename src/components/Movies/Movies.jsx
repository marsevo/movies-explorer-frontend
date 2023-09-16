import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { cardList } from '../../utils/const';
import Footer from '../Footer/Footer.jsx';

function Movies() {

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        <MoviesCardList cardList={cardList} />
        <div className="movies__container">
          <button className='movies__button'>Еще</button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Movies;