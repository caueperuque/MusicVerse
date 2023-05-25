import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import { getUser, updateUser } from '../services/userAPI';
import './style/ProfileEdit.css';

class ProfileEdit extends Component {
  state = {
    isLoading: true,
    isDisable: true,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    const returnAPI = await getUser();
    const { name, email, image, description } = returnAPI;
    this.setState({
      isLoading: false,
      name,
      email,
      image,
      description,
    });
  }

  validationInputs = async () => {
    const { name, email, image, description } = this.state;
    // const numNotInt = -1;
    const valName = name.length > 0;
    const atIndex = email.indexOf('@');
    const dotComIndex = email.indexOf('.com');
    const teste = (atIndex >= 0 && dotComIndex > atIndex && dotComIndex - atIndex > 1);
    const valEmail = teste;
    const valDesc = description.length > 0;
    const valImage = image.length > 0;
    this.setState({
      isDisable: !(valName && valEmail && valDesc && valImage),
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validationInputs);
  };

  handleClick = async (event) => {
    const { name, email, image, description } = this.state;
    event.preventDefault();
    const { history } = this.props;
    this.setState({ isLoading: true });
    await updateUser({
      name,
      email,
      image,
      description,
    });
    history.push('/profile');
  };

  render() {
    const { name, email, image, description, isLoading, isDisable } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { !isLoading && (
          <>
            <div className="album__title">
              <h1 className="subtitle is-3">Edit Profile</h1>
            </div>
            <section id="profileEdit__container-main">
              <form className="box" id="profileEdit__subcontainer">
                <label htmlFor="input-name">
                  Change name:
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="name"
                    id="input-name"
                    className="input"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="input-email">
                  Change email:
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    name="email"
                    id="input-email"
                    className="input"
                    // placeholder={ email }
                    value={ email }
                    onChange={ this.handleChange }

                  />
                </label>
                <label htmlFor="input-description">
                  Change your description:
                  <input
                    data-testid="edit-input-description"
                    type="text"
                    name="description"
                    id="input-description"
                    className="input"
                    // placeholder={ description }
                    value={ description }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="input-image">
                  Change your profile picture:
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    name="image"
                    id="input-image"
                    className="input"
                    value={ image }
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  data-testid="edit-button-save"
                  disabled={ isDisable }
                  className="button is-success"
                  onClick={ this.handleClick }
                >
                  Save
                </button>
              </form>
            </section>

          </>
        )}
      </div>

    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ProfileEdit;
