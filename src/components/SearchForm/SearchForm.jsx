function SearchForm() {
    return (
        <>
            <div className="search-form__center">
                <form className="search-form">
                    <div className="search-form__container">
                        <input className="search-form__input" type="text" placeholder="Фильм" required />
                        <button className="search-form__btn" type="button"></button>
                    </div>
                </form>
                <div className="search-form__toggle-container">
                    <input className="search-form__checkbox" type="checkbox" id="short-film-toggle" />
                    <label className="search-form__toggle" htmlFor="short-film-toggle"></label>
                    <p className="search-form__short-film-text">Короткометражки</p>
                </div>
            </div>
        </>
    )
}

export default SearchForm;