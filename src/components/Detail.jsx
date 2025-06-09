import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { useTMDBConfig } from "../context/TMDBConfigContext";
import { useSavedItems } from '../context/SavedItemsContext';

import BookmarkDetailButton from './BookmarkDetailButton';
import PlayButton from './PlayButton';

const Detail = () => {
    let { type, id } = useParams();
    const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;
    const [details, setDetails] = useState({});
    const [ratings, setRatings] = useState({});

    let normalizedType = type;

    const config = useTMDBConfig();

    const { savedItems, toggleSaveItem, isSaved } = useSavedItems();
    const savedKey = `${type}-${id}`;

    let isSavedValue = isSaved(savedKey);

    const [isBookmarked, setIsBookmarked] = useState(isSavedValue);
    

    
    useEffect(() => {
        let detailsUrl = ``;
        let ratingsUrl = ``;
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


    if (!config || !config.images) {
        return <div className='loading'><div className="spinner"></div></div>; 
      }

      if (!details || Object.keys(details).length === 0) return <div className='loading'><div className="spinner"></div></div>;

          
    const imageBaseUrl = config.images.secure_base_url;
    const backdropSize = config.images.backdrop_sizes[3];
    const imageUrl = details.backdrop_path ? `${imageBaseUrl}${backdropSize}${details.backdrop_path}` : "";

    if (type === "movie") {
        const rating = ratings.results?.find(r =>
          ["ES", "DE", "FR"].includes(r.iso_3166_1)
        )?.release_dates?.[0]?.certification;
      
        return (
          <div className="relative">
            <img src={imageUrl} className="w-full h-[600px] object-cover object-center z-0" />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#10141E]/80 to-[#10141E]/100" />
            <div className="absolute inset-0 z-20 p-10 lg:p-24">
              <h1 className="text-5xl">{details.title}</h1>
              <div className="inline-flex">
                <span className="flex flex-wrap my-2 mr-4">
                  {details.release_date?.slice(0, 4)}
                </span>
                {rating && (<span className="inline-block border border-gray-500 rounded my-2 mr-4 px-3 py-2 text-sm leading-none align-middle h-fit">
                    {rating}
                </span>)}
                {Array.isArray(details.genres) && details.genres.length > 0 && (
                    <ul className="flex flex-wrap gap-2 list-none p-0 my-2">
                        {details.genres.map((genre, i) => (
                        <li key={i} className="bg-[#5A698F] px-2 py-1 rounded-sm text-sm">
                            {genre.name}
                        </li>
                        ))}
                    </ul>
                    )}

              </div>
              <p className="lg:w-[50%]">{details.overview}</p>

                  
              <div className="w-max my-4 flex items-center gap-5">
                <Link to={`/video/${type}/${id}`} className="block">
                    <PlayButton />
                </Link>
                <BookmarkDetailButton isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSaveItem(savedKey);
                    }}/>
            </div>
              
            </div>
          </div>
        );
      } else if(type === "series") {
        const rating = ratings.results?.find(r =>
            ["ES", "FR", "DE", "GB"].includes(r.iso_3166_1)
          )?.rating;
        return (
            <div className="relative">
                <img src={imageUrl} className="w-full h-[600px] object-cover object-center z-0" />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#10141E]/80 to-[#10141E]/100" />
                <div className="absolute inset-0 z-20 p-10 lg:p-24">
                <h1 className="text-5xl">{details.name}</h1>
                <div className="inline-flex">
                <span className="flex flex-wrap my-2 mr-4">{details.first_air_date?.slice(0, 4)}</span>
                {rating && (<span className="inline-block border border-gray-500 rounded my-2 mr-4 px-3 py-2 text-sm leading-none align-middle h-fit">
                    {rating}
                </span>)}
                    <ul className="list-none flex flex-wrap gap-2">
                {Array.isArray(details.genres) && details.genres.length > 0 && (
                    <ul className="flex flex-wrap gap-2 list-none p-0 my-2">
                        {details.genres.map((genre, i) => (
                        <li key={i} className="bg-[#5A698F] px-2 py-1 rounded-sm text-sm">
                            {genre.name}
                        </li>
                        ))}
                    </ul>
                )}
                </ul>
                </div>
                <p className="mb-6">{details.number_of_seasons && `${details.number_of_seasons} seasons`}</p>
                <p className="lg:w-[50%]">{details.overview}</p>
                <div className="w-max my-4 flex items-center gap-2">
                <Link to={`/video/${type}/${id}`} className="block">
                    <PlayButton />
                </Link>
                <BookmarkDetailButton isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSaveItem(savedKey);
                    }}/>
            </div>
            </div>
            </div>
        );
    }



    
}

export default Detail;