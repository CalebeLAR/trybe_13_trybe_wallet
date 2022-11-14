import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputPassword: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validEmail = this.validEmail.bind(this);
    this.validPassword = this.validPassword.bind(this);
    this.isButtonDisable = this.isButtonDisable.bind(this);
  }

  handleChange({ target }) {
    const name = target.id;
    const { value } = target;
    this.setState({
      [name]: value,
    }, this.isButtonDisable);
  }

  validEmail() {
    const { inputEmail } = this.state;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(inputEmail);
  }

  validPassword() {
    const { inputPassword } = this.state;
    const minLength = 6;
    return inputPassword.length >= minLength;
  }

  isButtonDisable() {
    const email = this.validEmail();
    const password = this.validPassword();
    const isDisabled = !(email && password);
    this.setState({
      isDisabled,
    });
  }

  render() {
    const { inputEmail, inputPassword, isDisabled } = this.state;
    const { history } = this.props;
    return (
      <section>
        <form>
          <label htmlFor="inputEmail">
            email
            <input
              id="inputEmail"
              data-testid="email-input"
              type="email"
              value={ inputEmail }
              onChange={ this.handleChange }
              placeholder="email"
            />
          </label>
          <label htmlFor="inputPassword">
            password
            <input
              id="inputPassword"
              data-testid="password-input"
              type="password"
              value={ inputPassword }
              onChange={ this.handleChange }
              placeholder="password"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => history.push('/carteira') }
          >
            Entrar

          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
