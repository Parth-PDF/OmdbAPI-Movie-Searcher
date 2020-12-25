import './App.css';
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import MovieList from './components/MovieList';
import MovieHeading from './components/MovieHeading';
import MovieSearch from './components/MovieSearch';
import AddNominate from './components/AddNominate';
import RemoveNominate from './components/RemoveNominate';


function App() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [nominate, setNominate] = useState([]);

  /* API call: function to request URL and convert api key into Json format */
  const getMovieRequest = async () =>{
    const url = `http://www.omdbapi.com/?s=${search}&apikey=edd4fb1b`
    const response = await fetch(url);
    const responseJson = await response.json();

    /* Only renders search results if value is in search */
    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  /* Fire ups the API call function when page loads */
  useEffect(() => {
    getMovieRequest(search);
    // eslint-disable-next-line
  }, [search]);

    /* Retrieves items from localstorage and parses into JSON string to be shown */
    useEffect(() => {
      const NominatedMovies = JSON.parse(localStorage.getItem('movie-searcher'));
      if(NominatedMovies){
        setNominate(NominatedMovies);
      }
    }, []);

  /* Method to add movies to nomination list */
  const NominateMovie = (movie) => {

    if(nominate.length < 5) {
      const uniqueMovies = [...nominate, movie];
      const NominateMovieList = Array.from(new Set(uniqueMovies));

      setNominate(NominateMovieList);
      saveMovies(NominateMovieList);
    } 
    
    if(nominate.length === 5){
      alert('Congratulations, you have nominated 5 movies!');
    }
  };

  /* Method to remove movies to nomination list */
  const RemoveNominateMovie = (movie) => {
    const NewNominateMovieList = nominate.filter((nominate) => nominate.imdbID !== movie.imdbID);
    setNominate(NewNominateMovieList);
    saveMovies(NewNominateMovieList);
  };

  /* Method to save nominations list into localstorage which will later be retrieved */
  const saveMovies = (items) => {
    localStorage.setItem('movie-searcher', JSON.stringify(items))
  }

  return (
    <div className='my-app'>
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieHeading heading = 'Movies'/>
          <MovieSearch search={search} setSearch={setSearch}/>
        </div>

        <div className='row'>
          <MovieList movies = {movies} handleNomination = {NominateMovie} nominateComponent = {AddNominate}/>
        </div>

        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieHeading heading = 'Nominations'/>
        </div>

        <div className='row'>
          <MovieList movies = {nominate} handleNomination = {RemoveNominateMovie} nominateComponent = {RemoveNominate}/>
        </div>

      </div>
    </div>
  );
};

export default App;
