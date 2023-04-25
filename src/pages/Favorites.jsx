import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard/MusicCard';
import './style/Favorites.css';

class Favorites extends Component {
  state = {
    arrayFavMusics: '',
  };

  async componentDidMount() {
    const resultAPI = await getFavoriteSongs();
    this.setState({
      arrayFavMusics: resultAPI,
    });
  }

  async componentDidUpdate() {
    const newResult = await getFavoriteSongs();
    // console.log('teste');
    this.setState({
      arrayFavMusics: newResult,
    });
  }

  render() {
    const { arrayFavMusics } = this.state;
    return (

      <div data-testid="page-favorites">
        <Header />
        <section className="favorites__container-musics">
          { arrayFavMusics && (
            <article className="box" id="favorites__musics">
              {
                arrayFavMusics.map(({
                  trackName,
                  previewUrl,
                  trackId,
                }) => (
                  <MusicCard
                    key={ trackName }
                    trackName={ trackName }
                    trackId={ trackId }
                    previewUrl={ previewUrl }
                  />
                ))
              }
            </article>

          ) }
        </section>

      </div>

    );
  }
}

export default Favorites;
