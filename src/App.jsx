import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Detail from './components/Detail';
import Video from './components/Video';
import NavBar from './components/NavBar';
import { TMDBConfigProvider } from "./context/TMDBConfigContext";
import { SavedItemsProvider } from "./context/SavedItemsContext";


function App() {
  return (
    <TMDBConfigProvider>
      <SavedItemsProvider>
        <Routes>
          <Route path="/" element={<NavBar />}>
            {<Route index element={<Main />} />}
            {<Route path="/detail/:type/:id" element={<Detail />} />}
            {<Route path="/video/:type/:id" element={<Video />} />}
          </Route>
        </Routes>
      </SavedItemsProvider>
    </TMDBConfigProvider>
  );
}

export default App;
