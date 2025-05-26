import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Detail from './components/Detail';
import Video from './components/Video';
import { TMDBConfigProvider } from "./context/TMDBConfigContext";

function App() {
  return (
    <TMDBConfigProvider>
      <Routes>
        <Route path="/">
          {<Route index element={<Main />} />}
          {<Route path="/detail/:type/:id" element={<Detail />} />}
          {<Route path="/video/:type/:id" element={<Video />} />}
        </Route>
      </Routes>
    </TMDBConfigProvider>
  );
}

export default App;
