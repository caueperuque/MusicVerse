import React, { Component } from 'react';
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

      </header>
    );
  }
}

export default Header;
