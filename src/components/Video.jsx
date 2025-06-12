import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTMDBConfig } from "../context/TMDBConfigContext";
import { ReactComponent as BackIcon } from '../assets/icon-back.svg';


const Video = () => {
    const { type, id } = useParams();
    const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;

    const [videoId, setVideoId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const config = useTMDBConfig();

    useEffect(() => {
        let videosUrl = ``;
        let selectedId = ``;

        if(type === "movie") {
            videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos`;
        } else if (type === "series") {
            videosUrl = `https://api.themoviedb.org/3/tv/${id}/videos`;
        }

        fetch(videosUrl, {
            headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            if (!data?.results?.length) {
                setIsLoading(false);
                return;
            }
        
            const priorities = ["Trailer", "Teaser", "Featurette"];
            let selected = null;
        
            for (const type of priorities) {
                selected = data.results.find(
                    vid => vid.site === "YouTube" && vid.type === type
                );
                if (selected) break;
            }
        
            if (selected) {
                setVideoId(selected.key); // .key es el ID de YouTube
            }
            setIsLoading(false);
        })
        .catch(err => console.error(err));
    }, [id, type]);

    if (isLoading) {
        return  <div className='loading'><div className="spinner"></div></div>; 
    }

    if(videoId !== "") {
        return (
            <>
            <BackButton />
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                allowFullScreen
                title="YouTube video"
                />
            </div>
            </>
        );
    } else {
        return (
            <>
            <BackButton />
            <div className="w-full h-64 flex items-center justify-center">There's no video available at the moment.</div>
            </>
        );
    }

    
}

const BackButton = () => {
    const navigate = useNavigate();
  
    return (
      <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} className="mb-4">
        <BackIcon width="32" height="32" />
      </div>
    );
  };

export default Video;