import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';

class MusicCard extends Component {
  state = {
    favorite: false,
    isLoading: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    this.loading();
    const result = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favorite: result.some((id) => id.trackId === trackId),
    });
    // console.log(result);
  }

  loading = () => {
    this.setState({
      isLoading: true,
    });
  };

  handleChange = async ({ target: { checked } }) => {
    const { trackId } = this.props;
    this.loading();
    if (!checked) {
      await removeSong({ trackId });
      this.loading();
      this.setState({
        favorite: false,
      });
    }
    await addSong({ trackId });
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
