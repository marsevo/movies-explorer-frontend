import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavUnlogged from './NavUnlogged/NavUnlogged';
import NavLogged from './NavLogged/NavLogged';
import logo from './../../images/logo.svg';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className='nav'>
      <Link to='/' tabIndex={1}>
        <img className='nav__logo' src={logo} alt='логотип' />
      </Link>
      {location.pathname === '/' ? <NavUnlogged /> : <NavLogged />}
    </nav>
  )
}

export default Navigation;