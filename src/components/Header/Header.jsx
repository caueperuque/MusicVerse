import React, { Component } from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import './Header.css';
import NavBar from '../NavBar/NavBar';

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
                <NavBar />
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
