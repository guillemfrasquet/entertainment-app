import { useEffect, useState } from "react";
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
        };

        fetchAndSetBookmarked();
    }, []);
    return (
        <>
            <Carousel cardType={"horizontal"} title="Bookmarked movies" contents={bookmarkedMoviesDetails.slice().reverse()} contentType={"movie"} />
            <Carousel cardType={"horizontal"} title="Bookmarked TV series" contents={bookmarkedTvSeriesDetails.slice().reverse()} contentType={"tv"} />
            {/*<Carousel cardType={"horizontal"} title="Bookmarked TV series" contents={bookmarkedSeriesList} contentType={"tv"}/>*/}
        </>
    );
}

export default Bookmarked;