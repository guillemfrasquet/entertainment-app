import { createContext, useContext, useEffect, useState } from "react";

const TMDBConfigContext = createContext(null);

export const TMDBConfigProvider = ({children}) => {
    const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/configuration", {
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
              Accept: "application/json",
            },
          })
          .then(res => res.json())
          .then(data => setConfig(data))
          .catch(err => console.error("Error obtaining TMDB configuration info", err))
    }, []);

    return (
        <TMDBConfigContext.Provider value={config}>
            {children}
        </TMDBConfigContext.Provider>
    )
}

export const useTMDBConfig = () => useContext(TMDBConfigContext);
