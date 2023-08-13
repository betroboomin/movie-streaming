import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import tmdbApi, { category, movieType } from '../../Api/tmdbApi';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper';
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";

import apiConfig from '../../Api/apiConfig';
import './HeroSlide.css';
import 'swiper/css/autoplay'
import { Button, OutlineBtn } from '../buttons/button';




const HeroSlide = () => {
    SwiperCore.use([Autoplay]); 
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
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay:3000 }}
        
      >
        {movieItems.map((item, i) => (
          <SwiperSlide className='slide' key={i}>
            {({ isActive}) => (
            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
          )}
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HeroSlideItem = props => {
    let history = useNavigate();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);


    return(
        <div className={`heroslide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="heroslide__item__content container">
                <div className="heroslide__item__content__info">
                    <h2 className="title">
                        {item.title}
                        </h2>
                        <div className="overview">
                            {item.overview}
                        </div>
                        <div className="btns">
                            <Button onClick={()=> history('/movie/'+item.id)}>
                                watch now
                            </Button>
                            <OutlineBtn onClick={()=> console.log('trailer')}>
                                Watch Trailer
                            </OutlineBtn>
                        </div>
                    
                </div>
                <div className="heroslide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt='' />
                </div>
            </div>
        </div>
    )


}

export default HeroSlide;