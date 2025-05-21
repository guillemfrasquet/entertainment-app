import { useEffect, useState } from "react";
import HorizontalCard from "./HorizontalCard";
import PosterCard from "./PosterCard";
import CardsGrid from "./CardsGrid";

const Main = () => {
    const [popularList, setPopularList] = useState([]);

    const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-EN&page=1';
    
    useEffect(() => {
        fetch(popularUrl, {
            headers: {
                Authorization: 'Bearer [API_TOKEN]',
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => setPopularList(data.results))
        .catch(err => console.error(err));
    }, []);


    return(
        <>
        <CardsGrid cardType={"horizontal"} title="Trending" contents={popularList} contentType={"movie"} />
        <CardsGrid cardType={"poster"} title="Trending" contents={popularList} contentType={"movie"} />
        </>
        
    );
}

export default Main;