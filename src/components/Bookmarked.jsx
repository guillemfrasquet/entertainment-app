import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import CardsGrid from "./CardsGrid";
import SearchBar from "./SearchBar";
import Carousel from "./Carousel";

const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;

const fetchItems = async (ids, type) => {
  
  const promises = ids.map(id => 
    fetch(`https://api.themoviedb.org/3/${type}/${id}`, {
            headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
                Accept: 'application/json',
            },
        })
      .then(res => res.json())
  );

    const results = await Promise.all(promises);


  return results;
}

async function getDetailsFromIds(idsArray, type) {
    const details = fetchItems(idsArray, type);
    console.log(details);
    return details;
}


const Bookmarked = () => {
    const [bookmarkedMoviesDetails, setBookmarkedMoviesDetails] = useState([]);
    const [bookmarkedTvSeriesDetails, setBookmarkedTvSeriesDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
    const fetchAndSetBookmarked = async () => {
            const stored = JSON.parse(localStorage.getItem('savedItems') || '{}');
            const bookmarkedMoviesIds = stored.movie || [];
            const bookmarkedSeriesIds = stored.series || [];

            console.log(bookmarkedMoviesIds);
            console.log(bookmarkedSeriesIds);

            const movies = await getDetailsFromIds(bookmarkedMoviesIds, "movie");
            setBookmarkedMoviesDetails(movies);

            const series = await getDetailsFromIds(bookmarkedSeriesIds, "tv");
            setBookmarkedTvSeriesDetails(series);

            setIsLoading(false);
        };

        fetchAndSetBookmarked();
    }, []);

    if (isLoading) {
    return  <div className='loading'><div className="spinner"></div></div>; 
  }

    if (bookmarkedMoviesDetails.length > 0 || bookmarkedTvSeriesDetails.length > 0) {
        return (
            <div className="mt-10">
                <Carousel cardType={"horizontal"} title="Bookmarked movies" contents={bookmarkedMoviesDetails.slice().reverse()} contentType={"movie"} />
                <Carousel cardType={"horizontal"} title="Bookmarked TV series" contents={bookmarkedTvSeriesDetails.slice().reverse()} contentType={"tv"} />
            </div>
        );
    } else {
        return (
            <div className="mt-10">
                <h2 className="text-3xl font-extralight pb-12">Your bookmarks</h2>
                <p className="text-lg">You haven't saved any content yet</p>
                <p className="mt-2">Start exploring and bookmark your favorite movies and series!</p>
                <Link to={`/`} className="block">
                    <button
                        className="mt-6 px-4 py-2 bg-[#5A698F] text-white rounded transition"
                    >
                        Explore content
                    </button>
                </Link>
            </div>
        );
    }
    
}

export default Bookmarked;