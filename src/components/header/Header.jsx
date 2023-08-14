import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import logo from '../../assets/logo/movie2.png'

const headerNav = [
  {
    display: 'Home',
    path: '/'
  },
  {
    display: 'Movies',
    path: '/movie'
  },
  {
    display: 'Tv Series',
    path: '/tv'
  }
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef();

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  const active = headerNav.findIndex((e) => e.path === pathname);
  return (
    <div ref={headerRef} className='header'>
      <div className="header__wrap container">
        <div className="logo">
          <Link className="logostyle" to="/">
            <h1>
             <span className='color-logo'>B</span>etro
            </h1>
          </Link>
          <img src={logo} alt="Logo" />
        </div>
        <ul className="header__nav">
          {headerNav.map((list, i) => (
            <li
              key={i}
              className={`${i === active ? 'active' : ''}`}
            >
              <Link className='liststyling'  to={list.path}>
                {list.display}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;