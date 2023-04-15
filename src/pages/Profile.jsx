import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { getUser } from '../services/userAPI';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Profile extends Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    const returnAPI = await getUser();
    const { name, email, image, description } = returnAPI;
    this.setState({
      name,
      email,
      image,
      description,
      loading: true,
    });
  }

  render() {
    const { name, email, image, description, loading } = this.state;
    return (

      <div data-testid="page-profile">
        <Header />
        { loading && (
          <div>
            <img src={ image } alt={ `imagem de ${name}` } data-testid="profile-image" />
            <p>
              {name}
            </p>
            <p>
              {email}
            </p>
            <p>
              {description}
            </p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        ) }
      </div>

    );
  }
}

export default Profile;
