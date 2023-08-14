import React, { useState, useEffect, useRef} from 'react';
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
import Modal,{ModalContent} from '../modal/Modal';




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
      {
        movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
      }
    </div>
  );
};

const HeroSlideItem = props => {
    let history = useNavigate();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);
  const setModalActivity = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0){
      const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
      modal.querySelector('.modal__content > iframe'). setAttribute('src', videoSrc)
    }else{
      modal.querySelector('.modal__content').innerHTML = 'No Trailer';
    } 
    modal.classList.toggle('active');
  }

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
                            <OutlineBtn onClick={setModalActivity
                              // console.log('trailer')
                              }>
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

const TrailerModal = props => {
  const item = props.item;
  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src','');
  return(
    <Modal active={false} id={`modal_${item.id}`}>
        <ModalContent onClose={onClose}>
            <iframe ref={iframeRef} width="100%" height="500px" title='Trailer'></iframe>
        </ModalContent>
    </Modal>
  )

}

export default HeroSlide;