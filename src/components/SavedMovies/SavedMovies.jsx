import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { savedCardList } from '../../utils/const';
import Footer from '../Footer/Footer.jsx'

function SavedMovies() {
  return (
    <>
      <Header />
      <div className='movies__saved-container'>
        <main className="movies__saved">
          <SearchForm />
          <MoviesCardList
            cardList={savedCardList} isSavedPage={true}
          />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default SavedMovies;



