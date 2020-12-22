import './App.css';
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import MovieList from './components/MovieList';


function App() {
  
  
  const [movies, setMovies] = useState([ ]);
  
  {/* function to request URL and convert api key into Json format */}
  const getMovieRequest = async () =>{
    const url = "http://www.omdbapi.com/?i=star wars&apikey=263d22d8"
    const response = await fetch(url);
    const responseJson = await response.json();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='container-fluid movie-app'>
          <div className='row'>
            <MovieList movies = {movies}/>
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
