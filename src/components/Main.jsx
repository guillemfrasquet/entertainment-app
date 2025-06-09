import { useEffect, useState } from "react";
import CardsGrid from "./CardsGrid";
import Carousel from "./Carousel";
import SearchBar from "./SearchBar";

const Main = () => {
    const [popularMoviesList, setPopularMoviesList] = useState([]);
    const [popularSeriesList, setPopularSeriesList] = useState([]);
    const [trendingSeriesList, setTrendingSeriesList] = useState([]);
    const [animationSeriesList, setAnimationSeriesList] = useState([]);
    const [textSearched, setTextSearched] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;

    const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const popularSeriesUrl = 'https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=18|10765|10751|10766&with_original_language=en';
    const trendingSeriesUrl = 'https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=1';
    const animationSeriesUrl = 'https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=16';
    let multiSearchUrl = '';
    
    
    useEffect(() => {
        fetch(popularMoviesUrl, {
            headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
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
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => setPopularSeriesList(data.results))
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch(trendingSeriesUrl, {
            headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => setTrendingSeriesList(data.results))
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch(animationSeriesUrl, {
            headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => setAnimationSeriesList(data.results))
        .catch(err => console.error(err));
    }, []);


    useEffect(() => {
        if(textSearched.length >= 2) {
            multiSearchUrl = `https://api.themoviedb.org/3/search/multi?query=${textSearched}&include_adult=false&language=en-US&page=1`;
            fetch(multiSearchUrl, {
                headers: {
                    Authorization: `Bearer ${TMDB_API_TOKEN}`,
                    Accept: 'application/json',
                },
            })
            .then(res => res.json())
            .then(data => setSearchResults(data.results))
            .catch(err => console.error(err));
        }
        
    }, [textSearched]);


    if(!textSearched || textSearched === "" || textSearched.length <= 2) {
       return(
            <div className="px-2 lg:pr-12">
            <SearchBar setTextSearched={setTextSearched}/>
            <Carousel cardType={"poster"} title="Trending series this week" contents={trendingSeriesList} contentType={"tv"} limit={10} />
            <Carousel cardType={"poster"} title="Popular movies" contents={popularMoviesList} contentType={"movie"} limit={10} />
            <Carousel cardType={"horizontal"} title="Animation" contents={animationSeriesList} contentType={"tv"} limit={10} />
            <Carousel cardType={"horizontal"} title="Popular series" contents={popularSeriesList} contentType={"tv"}/>
            </div>
            
        );
    } else {
        return(
            <div className="px-2 lg:pr-12">
            <SearchBar setTextSearched={setTextSearched} searchType={"multi"}/>
            <div className="text-3xl">Search results for "{textSearched}"</div>
            <CardsGrid cardType={"horizontal"} contents={searchResults} contentType={"multi"} />
            </div>
            
        );
    }
    }
    

export default Main;