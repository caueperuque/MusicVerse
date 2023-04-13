import React, { Component } from 'react';
import Header from '../components/Header/Header';

class Search extends Component {
  state = {
    isDisable: true,
    searchValue: '',
  };

  validationInput = () => {
    const { searchValue } = this.state;
    const minLength = 2;
    const valSearch = searchValue.length >= minLength;
    this.setState({
      isDisable: !valSearch,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validationInput);
  };

  render() {
    const { isDisable } = this.state;
    return (

      <div data-testid="page-search">
        <Header />

        <form>
          <label htmlFor="input-search">
            <input
              type="text"
              name="searchValue"
              id="input-search"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
          <button data-testid="search-artist-button" disabled={ isDisable }>
            Pesquisar
          </button>

        </form>

      </div>

    );
  }
}

export default Search;
