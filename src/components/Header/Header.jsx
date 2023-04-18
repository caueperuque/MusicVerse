import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import './Header.css';

class Header extends Component {
  state = {
    user: '',
    isLoading: true,
  };

  async componentDidMount() {
    const result = await getUser();
    this.setState({
      user: result.name,
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component" className="box" id="header">

        {
          isLoading ? (
            <Loading />
          ) : (
            <section id="header__section">
              <div>
                <h2
                  data-testid="header-user-name"
                  className="title is-4"
                  id="header__title"
                >
                  {`Welcome,
                  ${user}
                  !`}
                </h2>
              </div>
              <article className="header__container">
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
              </article>
              {/* <hr /> */}

            </section>
          )
        }

      </header>
    );
  }
}

export default Header;
