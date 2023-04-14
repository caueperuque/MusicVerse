import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard/MusicCard';
import Loading from '../components/Loading/Loading';

class Album extends Component {
  state = {
    bandName: '',
    albumName: '',
    albumMusics: '',
    isLoading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const band = musics.map(({ artistName }) => artistName)[0];
    const colectionName = musics
      .map(({ collectionCensoredName }) => collectionCensoredName)[0];
    this.setState({
      bandName: band,
      albumName: colectionName,
      albumMusics: musics,
    });
  }

  render() {
    const { bandName, albumName, albumMusics, isLoading } = this.state;
    return (

      <div data-testid="page-album">
        <Header />
        { bandName && (
          <div>
            <h1 data-testid="artist-name">
              { bandName }
            </h1>
            <h2 data-testid="album-name">
              { albumName }
            </h2>
          </div>
        )}
        { isLoading ? (
          <Loading />
        ) : (
          <div>
            { albumMusics && (
              <div key={ Math.random() }>
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
              </div>
            ) }
          </div>
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
