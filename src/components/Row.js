import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Row({isLargeRow, title, id, fetchUrl}) {
  const [movies, setMovies] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const [movieSelected, setmovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results)
    return request;
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setmovieSelected(movie);
  }
  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
        modules = {[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{clickable: true}}
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <div id={id} className='row_posters'>
          {movies.map((movie) => (
            <SwiperSlide>
              <img 
                key={movie.id}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {
        ModalOpen && (
          <MovieModal {...movieSelected} setModalOpen = {setModalOpen} />
        ) 
      }
    </section>
  )
}

