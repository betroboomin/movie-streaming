import React from "react";
import PropTypes from "prop-types";
import "./MovieCard.css";
import { Link } from "react-router-dom";
import { Button } from "../buttons/button";
import { category } from "../../Api/tmdbApi";
import apiConfig from "../../Api/apiConfig";
import { FaPlay } from 'react-icons/fa';

const MovieCard = (props) => {
  const item = props.item;
  const link = "/" + category[props.category] + "/" + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  return (
    <Link to={link} className="listing">
      <div className="movie-card" style={{  backgroundImage: `url(${bg})` }}>
        <Button>
            <FaPlay />
        </Button>
        
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};
MovieCard.propTypes = {};
export default MovieCard;
