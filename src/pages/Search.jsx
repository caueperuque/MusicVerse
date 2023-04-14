import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading/Loading';

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
        { isLoading ? (
          <Loading />
        ) : (
          <>
            <form>
              <label htmlFor="input-search">
                <input
                  type="text"
                  name="searchValue"
                  id="input-search"
                  data-testid="search-artist-input"
                  onChange={ this.handleChange }
                  value={ searchValue }
                />
              </label>
              <button
                data-testid="search-artist-button"
                disabled={ isDisable }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
            {returnAPI && returnAPI.length > 0 && (
              <>
                <p>{`Resultado de álbuns de: ${savedNameArtist} `}</p>
                { returnAPI.map(({
                  artistName,
                  collectionId,
                  collectionName,
                  artworkUrl100,
                }) => (
                  <>
                    <img
                      key={ collectionId }
                      src={ artworkUrl100 }
                      alt={ `Imagem do album ${collectionName} de ${artistName}` }
                    />
                    <h3>
                      { collectionName }
                    </h3>
                    <p>
                      { artistName }
                    </p>
                    <div>
                      <Link
                        to={ `/album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        Clique aqui para acessar o albúm
                      </Link>
                    </div>
                  </>
                ))}
              </>
            )}
            {!hasAlbum && returnAPI && returnAPI.length === 0 && (
              <p>Nenhum álbum foi encontrado</p>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Search;
