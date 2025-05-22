import { useEffect, useState } from "react";
import CardsGrid from "./CardsGrid";

const Main = () => {
    const [popularMoviesList, setPopularMoviesList] = useState([]);
    const [popularSeriesList, setPopularSeriesList] = useState([]);
    const [animationSeriesList, setAnimationSeriesList] = useState([]);

    const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const popularSeriesUrl = 'https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=18|10765|10751|10766&with_original_language=en';
    const animationSeriesUrl = 'https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=16';
    
    useEffect(() => {
        fetch(popularMoviesUrl, {
            headers: {
                Authorization: 'Bearer [API_TOKEN]',
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => setPopularMoviesList(data.results))
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch(popularSeriesUrl, {
            headers: {
                Authorization: 'Bearer [API_TOKEN]',
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => setPopularSeriesList(data.results))
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch(animationSeriesUrl, {
            headers: {
                Authorization: 'Bearer [API_TOKEN]',
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => setAnimationSeriesList(data.results))
        .catch(err => console.error(err));
    }, []);


    return(
        <>
        <CardsGrid cardType={"horizontal"} title="Trending series" contents={popularSeriesList} contentType={"tv"} limit={10} />
        <CardsGrid cardType={"poster"} title="Trending movies" contents={popularMoviesList} contentType={"movie"} limit={7} />
        <CardsGrid cardType={"horizontal"} title="Animation" contents={animationSeriesList} contentType={"tv"} limit={10} />
        </>
        
    );
}

export default Main;