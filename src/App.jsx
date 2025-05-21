import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import { TMDBConfigProvider } from "./context/TMDBConfigContext";

function App() {
  return (
    <TMDBConfigProvider>
      <Routes>
        <Route path="/">
          {<Route index element={<Main />} />}
        </Route>
      </Routes>
    </TMDBConfigProvider>
  );
}

export default App;
