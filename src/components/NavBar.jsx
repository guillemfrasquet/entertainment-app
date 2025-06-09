import { Outlet, Link } from "react-router-dom";

import { ReactComponent as NavBookmarkIcon } from '../assets/icon-nav-bookmark.svg';
import { ReactComponent as NavHomeIcon } from '../assets/icon-nav-home.svg';
import { ReactComponent as NavMoviesIcon } from '../assets/icon-nav-movies.svg';
import { ReactComponent as NavTvSeriesIcon } from '../assets/icon-nav-tv-series.svg';
import { ReactComponent as Logo } from '../assets/logo.svg';


export default function NavBar() {
  return (
    <>
      <nav className="flex items-center mx-2 px-6 py-3 pb-3 mb-6 rounded-xl bg-[#161D2F] lg:fixed lg:top-0 lg:left-0 lg:h-[90vh] lg:w-[80px] lg:flex-col lg:py-6 lg:m-8 lg:z-50">
        <Link to="/"><Logo /></Link>
        <div className="flex-1 flex justify-center gap-10 lg:flex-col">
            <Link to="/"><NavHomeIcon /></Link>
            <Link to="/movies"><NavMoviesIcon /></Link>
            <Link to="/series"><NavTvSeriesIcon /></Link>
            <Link to="/"><NavBookmarkIcon /></Link>
        </div>
        

      </nav>
      <main className="lg:ml-32">
        <Outlet /> {/* Aquí se renderizan las páginas hijas */}
      </main>
    </>
  );
}
