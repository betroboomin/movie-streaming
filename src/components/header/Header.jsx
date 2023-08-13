import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

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
    <div ref={headerRef}>
      <div className="headerwrap container">
        <div className="logo">
          <Link className="logostyle" to="/">
            <h1>
              <span className="color-logo">B</span>etro{' '}
              <span className="logosmall">
                <span className="color-logo">M</span>ovies
              </span>
            </h1>
          </Link>
        </div>
        <ul className="headernav">
          {headerNav.map((list, i) => (
            <li
              key={i}
              className={`${i === active ? 'active' : 'listdisplay'}`}
            >
              <Link className="listdisplay" to={list.path}>
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