import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading/Loading';
import './style/Search.css';
import InputSearch from '../components/InputSearch/InputSearch';

class Search extends Component {
  state = {
    isDisable: true,
    isLoading: false,
    searchValue: '',
    savedNameArtist: '',
    hasAlbum: false,
    returnAPI: '',
  };

  validationInput = () => {
    const { searchValue } = this.state;
    const minLength = 2;
    const valSearch = searchValue.length >= minLength;
    this.setState({
      isDisable: !valSearch,
      // success: false,
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      searchValue: value,
    }, this.validationInput);
  };

  saveName = () => {
    this.setState((prevState) => ({
      savedNameArtist: prevState.searchValue,
    }));
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { searchValue } = this.state;
    this.setState({
      isLoading: true,
    });
    const returnAPI = await searchAlbumsAPI(searchValue);
    this.saveName();
    this.setState({
      isLoading: false,
      searchValue: '',
      returnAPI,
      hasAlbum: !returnAPI.length === 0,
    });
  };

  render() {
    const {
      isDisable,
      isLoading,
      searchValue,
      savedNameArtist,
      returnAPI,
      hasAlbum,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <form className="search__form">
              <section className="search__section">
                <article className="search__container-input">
                  <InputSearch
                    handleChange={ this.handleChange }
                    value={ searchValue }
                  />
                  <button
                    data-testid="search-artist-button"
                    disabled={ isDisable }
                    onClick={ this.handleClick }
                    className="button  is-success"
                  >
                    Search
                  </button>
                </article>
              </section>
            </form>

            {returnAPI && returnAPI.length > 0 && (
              <section className="search__container-albums">
                <div className="search__container-text-results">
                  <p
                    className="subtitle"
                  >
                    {`Resultado de álbuns de: ${savedNameArtist} `}
                  </p>
                </div>
                <article className="search__container-albums-card">
                  {returnAPI.map(
                    (
                      { artistName, collectionId, collectionName, artworkUrl100 },
                      index,
                    ) => (
                      <article key={ Math.random() } className="box search__album-card">
                        <img
                          key={ collectionId }
                          src={ artworkUrl100.replaceAll('100x100bb', '200x200bb') }
                          alt={ `Imagem do album ${collectionName} de ${artistName}` }
                          className="search__album-image"
                        />
                        <h3
                          className="search__album-card-text subtitle"
                          key={ collectionName }
                        >
                          {` ${collectionName}  🎵`}
                        </h3>
                        <p className="search__album-card-text" key={ artistName[index] }>
                          {artistName}
                        </p>
                        <div className="search__album-card-text" key={ index }>
                          <Link
                            key={ collectionId[index] }
                            to={ `/album/${collectionId}` }
                            data-testid={ `link-to-album-${collectionId}` }
                          >
                            Click here to access the album
                          </Link>
                        </div>
                      </article>
                    ),
                  )}
                </article>
              </section>
            )}

            {!hasAlbum && returnAPI && returnAPI.length === 0 && (
              <div className="search__container-albuns">
                <p>Nenhum álbum foi encontrado</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Search;
