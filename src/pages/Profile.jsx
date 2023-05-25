import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header/Header';
import { getUser } from '../services/userAPI';
import './style/Profile.css';

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
          <section id="profile__container-main">
            <article className="box" id="profile__subcontainer">
              <div className="profile__container-img-desc">
                <div className="profile__img-email">
                  <img
                    src={ image }
                    alt={ `${name}` }
                    className="profile__image"
                    data-testid="profile-image"
                  />
                  <p>
                    {name}
                  </p>
                  <p>
                    {email}
                  </p>
                </div>
                <hr id="profile__bar" />
                <p id="profile__container-desc">
                  {description}
                </p>
              </div>
              <div id="profile__link">
                <Link to="/profile/edit" className="button">Edit Profile</Link>
              </div>
            </article>
          </section>
        ) }
      </div>

    );
  }
}

export default Profile;
