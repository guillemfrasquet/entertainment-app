import { useEffect, useState } from "react";
import CardsGrid from "./CardsGrid";
import SearchBar from "./SearchBar";


const Movies = () => {
    const [popularMoviesList, setPopularMoviesList] = useState([]);
    const [textSearched, setTextSearched] = useState("");
    const [searchResults, setSearchResults] = useState([]);


    const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;
    
    let searchUrl = '';

    const fetchPopularMovies = async () => {
        const pages = [1,2,3];

        try {
            const results = await Promise.all(
                pages.map(page => 
                    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, { headers: {
                        Authorization: `Bearer ${TMDB_API_TOKEN}`,
                        Accept: 'application/json',
                    }}).then(res => res.json())
                )
            );

            const movies = results.flatMap(data => data.results);
            setPopularMoviesList(movies);
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        fetchPopularMovies();
    }, []);

    useEffect(() => {
        searchUrl = `https://api.themoviedb.org/3/search/movie?query=${textSearched}&include_adult=false&language=en-US&page=1`;
        if(textSearched.length >= 2) {
            fetch(searchUrl, {
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
            <SearchBar setTextSearched={setTextSearched} searchType={"movies"}/>
            <CardsGrid cardType={"horizontal"} contents={popularMoviesList} contentType={"multi"}  title={"Popular movies"}/>
        </div>
            
        );
    } else {
        return(
            <div className="px-2 lg:pr-12">
            <SearchBar setTextSearched={setTextSearched} searchType={"movies"}/>
            <div className="text-3xl">Search results for "{textSearched}"</div>
            <CardsGrid cardType={"horizontal"} contents={searchResults} contentType={"movies"}/>
            </div>
            
        );
    }
}

export default Movies;