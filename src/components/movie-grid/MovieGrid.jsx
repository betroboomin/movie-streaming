import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import './MovieGrid.css';
import MovieCard from '../movie-card/MovieCard';
import { useParams } from 'react-router-dom';
import tmdbApi, { movieType, tvType } from '../../Api/tmdbApi';
import { category } from '../../Api/tmdbApi';
import { OutlineBtn } from '../buttons/button';

const MovieGrid = props => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);
   const { keyword } = useParams();
   useEffect(()=>{
    const getList = async () => {
    let response = null;
    if(keyword === undefined){
        const params = {}; 
        switch(props.category){
            case category.movie:
                response = await tmdbApi.getMovieList(movieType.upcoming, {params});
                break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {params});
        }
    } else{
        const params = {
            query : keyword
        }
        response = await tmdbApi.search(props.category, {params})
    }
    setItems(response.results)
    setTotalPage(response.total_pages)
}
getList();
   }, [props.category, keyword])


const loadmore = async () => {
    let response = null;
    if(keyword === undefined){
        const params = {
            page : page + 1
        }; 
        switch(props.category){
            case category.movie:
                response = await tmdbApi.getMovieList(movieType.upcoming, {params});
                break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {params});
        }
    } else{
        const params = {
            query : keyword,
            page: page + 1
        }
        response = await tmdbApi.search(props.category, {params})
    }
    setItems([...items,...response.results])
    setPage(page + 1);
}
  return (
    <>
    <div className='movie-grid'>
       {
        items.map((item,i)=><MovieCard category={props.category} item={item} key={i}/>)
       }
        </div>
        {
            page < totalPage ? (
                <div className="movie-grid__load-more">
                    <OutlineBtn className="small" onClick={loadmore}>
                        Load More
                    </OutlineBtn>
                </div>
            ) : null
        }
        </>
        
  );
}

// MovieGrid.propTypes = {

// }

export default MovieGrid;