import React, { useState, useEffect } from 'react';
import tmdbApi, { category, movieType } from '../../Api/tmdbApi';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper';
import SwiperCore, { Autoplay} from "swiper";

import apiConfig from '../../Api/apiConfig';
import './HeroSlide.css';

SwiperCore.use([Autoplay]); 

const Ayy = () => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, { params });
        setMovieItems(response.results.slice(0, 4));
        console.log(response);
      } catch {
        console.log('error');
      }
    };
    getMovies();
  }, []);

  return (
    <div className='heroslide'>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        breakpoints={{
            640: {
              slidesPerView: 1,
              centeredSlides: false,
            },
          }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>{({ isActive}) => (
            <img  src={apiConfig.originalImage(item.backdrop_path)} />
          )}
            {/* <img src={apiConfig.originalImage(item.backdrop_path)} alt={`Slide ${i + 1}`} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Ayy;