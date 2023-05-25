import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar__header">
        <div className="nav__container-items">
          <div className="nav__items">
            <Link to="/favorites" data-testid="link-to-favorites">
              <span className="nav__span">
                Favorites
              </span>
            </Link>
          </div>
          <div className="nav__items">
            <Link to="/profile" data-testid="link-to-profile">
              <span className="nav__span">
                Profile
              </span>
            </Link>
          </div>
          <div
            className="nav__items"
          >
            <Link to="/search" data-testid="link-to-search">
              <span className="nav__span">
                Search
              </span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
