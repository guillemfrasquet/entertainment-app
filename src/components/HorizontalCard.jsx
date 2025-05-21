import { useTMDBConfig } from "../context/TMDBConfigContext";
import { ReactComponent as MovieIcon } from '../assets/icon-category-movie.svg';
import { ReactComponent as TvIcon } from '../assets/icon-category-tv.svg';



const HorizontalCard = ({data, contentType}) => {
    const config = useTMDBConfig();

        const imageBaseUrl = config.images.secure_base_url;
        const backdropSize = config.images.backdrop_sizes[1];

    
        
        let contentTypeString = "";
        
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
    
        if (!data.backdrop_path) {
            console.log(`The '${data.title}' element has no valid backdrop image, so its card has been hidden`);
            return null; 
        }
        
        return (
            <div className="horizontal-card card">
                <img 
                    src={`${imageBaseUrl}${backdropSize}${data.backdrop_path}`} 
                    alt={data.title || 'Backdrop'} 
                />
                <div className="card-info">
                    <div className="card-details">
                        {contentTypeString}
                        {contentTypeString && " · "}
                        {data.release_date?.slice(0, 4)}
                    </div>
                    <div className="card-title">{data.title}</div>
                </div>
                
            </div>
        );
}

export default HorizontalCard;