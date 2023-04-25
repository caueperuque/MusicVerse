import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';
import './MusicCard.css';

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
  }

  loading = () => {
    this.setState({
      isLoading: true,
    });
  };

  handleChange = async ({ target: { checked } }) => {
    const { trackId, trackName, previewUrl } = this.props;
    this.loading();
    if (!checked) {
      await removeSong({ trackId, trackName, previewUrl });
      this.loading();
      this.setState({
        favorite: false,
      });
    } else if (checked) {
      await addSong({ trackId, trackName, previewUrl });
      this.setState({
        favorite: checked,
      });
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, isLoading } = this.state;
    return (

      <section>
        { isLoading ? (
          <Loading />
        ) : (
          <article className="musics__container">
            <h3>{trackName}</h3>
            <div className="musics__container-audio">
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ `favorite-input ${trackId}` }>
                <input
                  style={ { display: 'none' } }
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  name="favorite"
                  id={ `favorite-input ${trackId}` }
                  onChange={ this.handleChange }
                  checked={ favorite }
                />
                {/* <FontAwesomeIcon
                  icon={ faHeart }
                  className={ `icon ${favorite ? 'checked' : ''}` }
                  style={ {
                    color: favorite ? 'red' : 'white',
                  } }
                /> */}
                { favorite ? <i className="fa-solid fa-heart" id="teste" /> : <i className="fa-regular fa-heart" /> }
                {/* <i class="fa-regular fa-heart"/> */}
              </label>
            </div>
          </article>
        )}

      </section>

    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
