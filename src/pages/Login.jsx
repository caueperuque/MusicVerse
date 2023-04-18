import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading/Loading';
import './style/Login.css';

class Login extends Component {
  state = {
    isDisable: true,
    valueName: '',
    isLoading: false,
  };

  validationName = () => {
    const { valueName } = this.state;
    const minLength = 3;
    const lengthName = valueName.length >= minLength;
    this.setState({
      isDisable: !lengthName,
    });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.validationName);
  };

  calledAPI = async () => {
    const { valueName } = this.state;
    await createUser({ name: valueName });
    this.setState({
      isLoading: false,
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    this.setState({ isLoading: true });
    await this.calledAPI();
    history.push('/search');
  };

  render() {
    const { isDisable, isLoading } = this.state;
    return (
      <div data-testid="page-login" className="login__container">
        { isLoading ? (
          <Loading />
        ) : (
          <section className="login__section-form box" id="login__section">
            <div className="login__title">
              <h1 className="title is-1">Login</h1>
            </div>
            <form className="login__form">

              <label htmlFor="input-name" className="login__form-label">
                <FontAwesomeIcon icon={ faUser } />
                <input
                  type="text"
                  name="valueName"
                  id="input-name"
                  data-testid="login-name-input"
                  placeholder="Usuário"
                  onChange={ this.handleChange }
                  className="login__input input"
                />
              </label>

              <button
                data-testid="login-submit-button"
                disabled={ isDisable }
                onClick={ this.handleClick }
                className="button is-success"
              >
                Entrar
              </button>

            </form>
          </section>
        ) }

      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
