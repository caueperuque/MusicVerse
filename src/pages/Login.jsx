import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      <div data-testid="page-login">
        { isLoading ? (
          <Loading />
        ) : (
          <form>

            <label htmlFor="input-name">
              Nome:
              <input
                type="text"
                name="valueName"
                id="input-name"
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
            </label>

            <button
              data-testid="login-submit-button"
              disabled={ isDisable }
              onClick={ this.handleClick }
            >
              Entrar
            </button>

          </form>
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
