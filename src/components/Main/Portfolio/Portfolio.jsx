function Portfolio() {
    return (
      <section className="portfolio" id="portfolio">
        <h2 className="portfolio__title">
          Портфолио
        </h2>
        <ul className="portfolio__list">
          <li className='portfolio__item'>
            <a className="portfolio__link" target="_blank" rel="noopener noreferrer"
              href="https://github.com/marsevo/how-to-learn">
              Статичный сайт
            </a>
            <span className='portfolio__icon'>↗</span>
          </li>
          <li className='portfolio__item'>
            <a className="portfolio__link" target="_blank" rel="noopener noreferrer"
              href="https://github.com/marsevo/russian-travel">
              Адаптивный сайт
            </a>
            <span className='portfolio__icon'>↗</span>
          </li>
          <li className='portfolio__item'>
            <a className="portfolio__link" target="_blank" rel="noopener noreferrer"
              href="https://github.com/marsevo/mesto"
              >
              Одностраничное приложение
            </a>
            <span className='portfolio__icon'>↗</span>
          </li>
        </ul>
      </section>
    )
  }
  
  export default Portfolio;