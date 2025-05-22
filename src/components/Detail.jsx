import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';


const Detail = () => {
    const { type, id } = useParams();
    const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;
    const [details, setDetails] = useState({});
    const [ratings, setRatings] = useState({});

    let detailsUrl = ``;
    let ratingsUrl = ``;
    
    
    useEffect(() => {
        if(type === "movie") {
            detailsUrl = `https://api.themoviedb.org/3/movie/${id}`;
        } else if (type === "series") {
            detailsUrl = `https://api.themoviedb.org/3/tv/${id}`;
        }

        fetch(detailsUrl, {
            headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => setDetails(data))
        .catch(err => console.error(err));


        if(type === "movie") {
            ratingsUrl = `https://api.themoviedb.org/3/movie/${id}/release_dates`;
        } else if (type === "series") {
            ratingsUrl = `https://api.themoviedb.org/3/tv/${id}/content_ratings`;
        }

        fetch(ratingsUrl, {
            headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => setRatings(data))
        .catch(err => console.error(err));

    }, [id, type]);

    
    if(type === "movie") {
        const rating = ratings.results?.find(r =>
            ["ES", "DE", "FR"].includes(r.iso_3166_1)
          )?.release_dates?.[0]?.certification;
        return (
            <div>
                <h1 className="text-5xl">{details.title}</h1>
                <ul className="list-none flex flex-wrap gap-2">
                {Array.isArray(details.genres) && details.genres.length > 0 && (
                    <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                        {details.genres.map((genre, i) => (
                        <li key={i} className="bg-[#5A698F] px-2 py-1 rounded-sm text-sm">
                            {genre.name}
                        </li>
                        ))}
                    </ul>
                )}
                </ul>
                <span className="inline-flex border border-gray-500 rounded px-2">{rating && <p>{rating}</p>}</span>
                <p>{details.overview}</p>
            </div>
        );
    } else if(type === "series") {
        const rating = ratings.results?.find(r =>
            ["ES", "DE", "FR"].includes(r.iso_3166_1)
          )?.rating;
        return (
            <div>
                <h1 className="text-5xl">{details.name}</h1>
                <p>{details.number_of_seasons && `${details.number_of_seasons} seasons`}</p>
                <span className="inline-flex border border-gray-500 rounded px-2">{rating && <p>{rating}</p>}</span>
                <ul className="list-none flex flex-wrap gap-2">
                {Array.isArray(details.genres) && details.genres.length > 0 && (
                    <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                        {details.genres.map((genre, i) => (
                        <li key={i} className="bg-[#5A698F] px-2 py-1 rounded-sm text-sm">
                            {genre.name}
                        </li>
                        ))}
                    </ul>
                )}
                </ul>
                <p>{details.overview}</p>
            </div>
        );
    }



    
}

export default Detail;