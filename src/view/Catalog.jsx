import React from 'react';

import { useParams } from 'react-router-dom';
import PageHeader from '../components/page-header/PageHeader';
import {category as cate} from '../Api/tmdbApi'
import MovieGrid from '../components/movie-grid/MovieGrid';

const Catalog = () => {

  const { category} = useParams();
  console.log(category);

  return (
    <>
      <PageHeader>
        <h1>{category === cate.movie? 'Movies' : 'Tv Series'}</h1>
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category}/>
        </div>
      </div>
    </>
  );
}

export default Catalog;