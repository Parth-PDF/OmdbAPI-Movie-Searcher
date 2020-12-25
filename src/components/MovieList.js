import React from 'react';

/* function to grab movie poster image to be displayed */
const MovieList = (props) => {
    const NominateComponent = props.nominateComponent;
    
    return (
        <>
            {props.movies.map((movie, index)=>(
                <div className='image-container d-flex justify-content-start m-3'>
                    <div className='Titleoverlay d-flex align-items-center justify-content-center'>
                        <p>Title: {movie.Title} <br></br> Year: {movie.Year}</p>
                    </div>
                    <img src={movie.Poster} alt = 'movie'></img>
                    <div onClick={() => props.handleNomination(movie)} className='overlay d-flex align-items-center justify-content-center'>
                        <NominateComponent />
                    </div>
                </div>
            ))}
        </>
    );
};


export default MovieList;