import React from 'react';
import HeroSlide from '../components/hero-slide/HeroSlide';
import { Link } from 'react-router-dom';
import { Button, OutlineBtn } from '../components/buttons/button';
// import Ayy from '../components/hero-slide/ayy';
import MovieList from '../components/movie-list/MovieList';
import { category,movieType, tvType } from '../Api/tmdbApi';

import '../css/Home.css'

const Home = () => {
  return (
    <div className='Home'> 
      <HeroSlide />
      <div className="container"  >
        <div className="section mb-3"  >
          <div className="section__header mb-2" >
            <h2> Trending Movies</h2>
            <Link to="/movie">
                  <OutlineBtn className="Small">
                    View More
                  </OutlineBtn>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>
        <div className="section mb-3"  >
          <div className="section__header mb-2" >
            <h2> Top rated Movies</h2>
            <Link to="/movie">
                  <OutlineBtn className="Small">
                    View More
                  </OutlineBtn>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>
        <div className="section mb-3"  >
          <div className="section__header mb-2" >
            <h2> Trending TV</h2>
            <Link to="/tv">
                  <OutlineBtn className="Small">
                    View More
                  </OutlineBtn>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>
      </div>
      
    </div>
  );
}

export default Home;