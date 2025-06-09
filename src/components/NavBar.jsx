import { Outlet, Link } from "react-router-dom";

import { ReactComponent as NavBookmarkIcon } from '../assets/icon-nav-bookmark.svg';
import { ReactComponent as NavHomeIcon } from '../assets/icon-nav-home.svg';
import { ReactComponent as NavMoviesIcon } from '../assets/icon-nav-movies.svg';
import { ReactComponent as NavTvSeriesIcon } from '../assets/icon-nav-tv-series.svg';
import { ReactComponent as Logo } from '../assets/logo.svg';


export default function NavBar() {
  return (
    <>
      <nav className="flex items-center mx-2 lg:mx-16 px-6 py-3 pb-3 mb-6 rounded-xl bg-[#161D2F]">
        <Link to="/"><Logo /></Link>
        <div className="flex-1 flex justify-center gap-10">
            <Link to="/"><NavHomeIcon /></Link>
            <Link to="/"><NavMoviesIcon /></Link>
            <Link to="/"><NavTvSeriesIcon /></Link>
            <Link to="/"><NavBookmarkIcon /></Link>
        </div>
        

      </nav>
      <main>
        <Outlet /> {/* Aquí se renderizan las páginas hijas */}
      </main>
    </>
  );
}
