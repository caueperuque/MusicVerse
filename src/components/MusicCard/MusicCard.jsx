import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';

class MusicCard extends Component {
  state = {
    favorite: false,
    isLoading: false,
  };

  loading = () => {
    this.setState({
      isLoading: true,
    });
  };

  handleChange = async ({ target: { checked } }) => {
    const { trackId } = this.props;
    this.loading();
    // console.log(checked);
    await addSong({ trackId });
    // console.log({ track: { trackId } });
    this.setState({
      favorite: checked,
      isLoading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, isLoading } = this.state;
    return (

      <div>
        { isLoading ? (
          <Loading />
        ) : (
          <div>
            <h3>{trackName}</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite-input">
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name="favorite"
                id="favorite-input"
                onChange={ this.handleChange }
                checked={ favorite }
              />
            </label>
          </div>
        )}

      </div>

    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
