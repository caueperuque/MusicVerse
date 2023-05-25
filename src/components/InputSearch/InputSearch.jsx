import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputSearch extends Component {
  render() {
    const { searchValue, handleChange } = this.props;
    return (
      <label htmlFor="input-search">
        <input
          type="text"
          name="searchValue"
          id="input-search"
          className="input"
          placeholder="Search for songs..."
          data-testid="search-artist-input"
          onChange={ handleChange }
          value={ searchValue }
        />
      </label>
    );
  }
}

InputSearch.propTypes = {
  handleChange: PropTypes.func,
  searchValue: PropTypes.string,
}.isRequired;

export default InputSearch;
