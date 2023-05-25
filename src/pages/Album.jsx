import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard/MusicCard';
import Loading from '../components/Loading/Loading';
import './style/Album.css';

class Album extends Component {
  state = {
    bandName: '',
    albumName: '',
    albumMusics: '',
    albumImg: '',
    isLoading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const imgAlbum = musics.map(({ artworkUrl100 }) => artworkUrl100)[0];
    const band = musics.map(({ artistName }) => artistName)[0];
    const colectionName = musics
      .map(({ collectionCensoredName }) => collectionCensoredName)[0];
    this.setState({
      bandName: band,
      albumName: colectionName,
      albumMusics: musics,
      albumImg: imgAlbum,
    });
  }

  render() {
    const { bandName, albumName, albumMusics, isLoading, albumImg } = this.state;
    return (

      <div data-testid="page-album">
        <Header />
        { bandName && (
          <div>
            <div id="album__img">
              <img
                src={ albumImg.replaceAll('100x100bb', '200x200bb') }
                alt={ albumName }
              />
            </div>
            <div className="album__title">
              <h2 data-testid="album-name" className="subtitle is-3">
                { albumName }
              </h2>
              <h1 data-testid="artist-name" className="subtitle is-4">
                { bandName }
              </h1>
            </div>
          </div>
        )}
        { isLoading ? (
          <Loading />
        ) : (
          <section className="album__container-musics">
            { albumMusics && (
              <article key={ Math.random() } className="box" id="album__musics">
                { albumMusics.slice(1).map(({
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
                )) }
              </article>
            ) }
          </section>
        ) }
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
