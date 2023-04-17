import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import { getUser, updateUser } from '../services/userAPI';

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
            <h1>Editar perfil</h1>
            <form>
              <label htmlFor="input-name">
                Alterar nome:
                <input
                  data-testid="edit-input-name"
                  type="text"
                  name="name"
                  id="input-name"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="input-email">
                Alterar email:
                <input
                  data-testid="edit-input-email"
                  type="email"
                  name="email"
                  id="input-email"
                  // placeholder={ email }
                  value={ email }
                  onChange={ this.handleChange }

                />
              </label>
              <label htmlFor="input-description">
                Alterar sua descrição:
                <input
                  data-testid="edit-input-description"
                  type="text"
                  name="description"
                  id="input-description"
                  // placeholder={ description }
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="input-image">
                Alterar sua foto de perfil:
                <input
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  id="input-image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="edit-button-save"
                disabled={ isDisable }
                onClick={ this.handleClick }
              >
                Salvar
              </button>
            </form>
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
