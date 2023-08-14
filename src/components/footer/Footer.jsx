import React from 'react';
import './Footer.css'
import bg from '../../assets/footer/footer.jpg';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/movie2.png'
const Footer = () => {
  return (
    <div className='footer' style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
        <div className="logo">
          <Link className="logostyle" to="/">
            <h1>
             <span className='color-logo'>B</span>etro
            </h1>
          </Link>
          <img src={logo} alt="Logo" />
        </div>
        </div>
        <div className="footer__content__menus">
        <div className="footer__content__menu">
          <Link className='listing' to="/">Home</Link>
          <Link className='listing' to="/">Contact Us</Link>
          <Link className='listing' to="/">Term of Service</Link>
          <Link className='listing' to="/">About Us</Link>
          </div>
        <div className="footer__content__menu">
          <Link className='listing' to="/">Live</Link>
          <Link className='listing' to="/">FAQ</Link>
          <Link className='listing' to="/">Premium</Link>
          <Link className='listing' to="/">Privacy Policy</Link>
          </div>
        <div className="footer__content__menu">
          <Link className='listing' to="/">You must watch</Link>
          <Link className='listing' to="/">Recent Release</Link>
          <Link className='listing' to="/">Top IMDB</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;