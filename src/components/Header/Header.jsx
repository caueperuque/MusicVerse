import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';

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
      <header data-testid="header-component">

        {
          isLoading ? (
            <Loading />
          ) : (
            <h2 data-testid="header-user-name">
              { user }
            </h2>

          )
        }
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
