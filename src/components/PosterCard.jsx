import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useTMDBConfig } from "../context/TMDBConfigContext";
import { ReactComponent as MovieIcon } from '../assets/icon-category-movie.svg';
import { ReactComponent as TvIcon } from '../assets/icon-category-tv.svg';
import BookmarkCardButton from './BookmarkCardButton';

import { useSavedItems } from '../context/SavedItemsContext';


const PosterCard = ({data, contentType, textPosition}) => {
    const config = useTMDBConfig();

    let type;
        if (contentType === "movie") {
            type = "movie";
        } else if (contentType === "tv") {
            type = "series";
        }

    const { savedItems, toggleSaveItem, isSaved } = useSavedItems();

    let isSavedValue = isSaved(type, data.id);

    const [isBookmarked, setIsBookmarked] = useState(isSavedValue);

    if (!config?.images?.secure_base_url || !config?.images?.poster_sizes) {
        return null;
    }

        const imageBaseUrl = config.images.secure_base_url;
        const posterSize = config.images.poster_sizes[3];

        let contentTypeString = "";

        const title = data.title || data.name;
        const release_date = data.release_date || data.first_air_date;
        
        if(contentType === "movie") {
            contentTypeString = (
                <>
                  <MovieIcon className="inline w-4 h-4 mr-1" />
                  Movie
                </>
              );
        } else if (contentType === "tv") {
            contentTypeString = (
                <>
                  <TvIcon className="inline w-4 h-4 mr-1" />
                  TV Series
                </>
              );
        }    
    
        if (!data.poster_path) {
            console.log(`The '${title}' element has no valid poster image, so its card has been hidden`);
            return null; 
        }

        
        
        return (
            <Link to={`/detail/${type}/${data.id}`} className="block">
                <div className="relative w-40 sm:w-48 lg:w-52 rounded-md group transition-transform duration-200 hover:scale-105">
                    <img 
                        src={`${imageBaseUrl}${posterSize}${data.poster_path}`} 
                        alt={title || 'Poster'} 
                        className="rounded-md"
                    />

                    {/* Text position deppending on the prop value */}
                    {textPosition === "bottom" ? (
                        <div className="mt-1">
                        <div>
                            {contentTypeString}
                            {contentTypeString && " · "}
                            {release_date?.slice(0, 4)}
                        </div>
                        <div className="font-semibold leading-tight">{title}</div>
                    </div>
                    ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-0 left-0 w-full p-2 text-white bg-gradient-to-t from-black to-transparent rounded-b-md">
                        <div className="card-details">
                            {contentTypeString}
                            {contentTypeString && " · "}
                            {release_date?.slice(0, 4)}
                        </div>
                        <div className="font-semibold leading-tight">{title}</div>
                    </div>
                    )}
                    <BookmarkCardButton isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSaveItem(type, data.id);
                    }}/>
                </div>
            </Link>
        );
}

export default PosterCard;