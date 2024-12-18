// @ts-nocheck
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/NavBar.css';
import Logo from '../assets/hotstar-logo.png';

function NavBar() {

  return (
    <div className='container'>
      <nav className="navbar">
        <ul>
          <li className="logo">
            <img src={Logo} alt="Hotstar Logo" />
          </li>
          <li>
            <NavLink to="/profile">
              <i className="fa fa-user"></i>
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore">
              <i className="fa fa-search"></i>
              <span>Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
            >
              <i className="fa fa-home"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/latest-movies">
              <i className="fa fa-film"></i>
              <span>Movies</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tv">
              <i className="fa fa-tv"></i>
              <span>TV Shows</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites">
              <i className="fa fa-list"></i>
              <span>Favorites</span>  
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
