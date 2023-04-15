import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    isLoading: true,
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

  render() {
    const { name, email, image, description, isLoading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { !isLoading && (
          <form>
            <label htmlFor="input-name">
              Alterar nome:
              <input
                data-testid="edit-input-name"
                type="text"
                name=""
                id="input-name"
                placeholder={ name }
              />
            </label>
            <label htmlFor="input-email">
              Alterar email:
              <input
                data-testid="edit-input-email"
                type="email"
                name=""
                id="input-email"
                placeholder={ email }
              />
            </label>
            <label htmlFor="input-description">
              Alterar sua descrição:
              <input
                data-testid="edit-input-description"
                type="text"
                name=""
                id="input-description"
                placeholder={ description }
              />
            </label>
            <label htmlFor="input-description">
              Alterar sua foto de perfil:
              <input
                data-testid="edit-input-image"
                type="text"
                name=""
                id="input-description"
              />
            </label>
            <button data-testid="edit-button-save">
              Salvar
            </button>
          </form>
        )}
      </div>

    );
  }
}

export default ProfileEdit;
