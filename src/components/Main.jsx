import { useEffect, useState } from "react";
import CardsGrid from "./CardsGrid";
import Carousel from "./Carousel";
import SectionCarousel from "./SectionCarousel";
import SearchBar from "./SearchBar";

import { useSavedItems } from "../context/SavedItemsContext";


const Main = () => {
    const { savedItems } = useSavedItems();

    const [popularMoviesList, setPopularMoviesList] = useState([]);
    const [popularSeriesList, setPopularSeriesList] = useState([]);
    const [trendingSeriesList, setTrendingSeriesList] = useState([]);
    const [animationSeriesList, setAnimationSeriesList] = useState([]);
    const [popularSpanishSeriesList, setPopularSpanishSeriesList] = useState([]);
    const [textSearched, setTextSearched] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;

    const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const popularSeriesUrl = 'https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=18|10765|10751|10766&with_original_language=en';
    const trendingSeriesUrl = 'https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=1';
    const animationSeriesUrl = 'https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=16';
    const popularSpanishSeriesUrl = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&with_genres=18|10765|10751|10766&with_origin_country=ES';

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
        fetch(popularSpanishSeriesUrl, {
            headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => setPopularSpanishSeriesList(data.results))
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
            <SectionCarousel
                title="Trending series this week"
                apiUrl="https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=1"
                contentType="tv"
                cardType="poster"
                limit={10}
            />
            <SectionCarousel
                title="Popular movies"
                apiUrl="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
                contentType="movie"
                cardType="poster"
                limit={10}
            />
            <SectionCarousel
                title="Animation series"
                apiUrl="https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=16"
                contentType="tv"
                cardType="horizontal"
                limit={10}
            />
            <SectionCarousel
                title="Popular series"
                apiUrl="https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=18|10765|10751|10766&with_original_language=en"
                contentType="tv"
                cardType="horizontal"
                limit={10}
            />
            <SectionCarousel
                title="Spanish series"
                apiUrl="https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&with_genres=18|10765|10751|10766&with_origin_country=ES"
                contentType="tv"
                cardType="horizontal"
                limit={10}
            />
            <SectionCarousel
                title="Comedy movies"
                apiUrl="https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=35&with_original_language=en"
                contentType="movie"
                cardType="poster"
                limit={10}
            />
            <SectionCarousel
                title="Documentary series"
                apiUrl="https://api.themoviedb.org/3/discover/tv?air_date.lte=2015-01-01&language=en-US&sort_by=popularity.desc&with_genres=99&with_original_language=en"
                contentType="tv"
                cardType="horizontal"
                limit={10}
            />
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