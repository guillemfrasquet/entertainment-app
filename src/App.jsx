import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Detail from './components/Detail';
import Video from './components/Video';
import NavBar from './components/NavBar';
import Movies from './components/Movies';
import { TMDBConfigProvider } from "./context/TMDBConfigContext";
import { SavedItemsProvider } from "./context/SavedItemsContext";
import TvSeries from './components/TvSeries';
import Bookmarked from './components/Bookmarked';


function App() {
  return (
    <TMDBConfigProvider>
      <SavedItemsProvider>
        <Routes>
          <Route path="/" element={<NavBar />}>
            {<Route index element={<Main />} />}
            {<Route path="/detail/:type/:id" element={<Detail />} />}
            {<Route path="/video/:type/:id" element={<Video />} />}
            {<Route path="/movies" element={<Movies />} />}
            {<Route path="/series" element={<TvSeries />} />}
            {<Route path="/bookmarked" element={<Bookmarked />} />}
          </Route>
        </Routes>
      </SavedItemsProvider>
    </TMDBConfigProvider>
  );
}

export default App;
