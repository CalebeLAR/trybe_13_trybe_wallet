import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { connect } from 'react-redux';
import { actAddUser } from '../redux/actions/userActions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validEmail = this.validEmail.bind(this);
    this.validPassword = this.validPassword.bind(this);
    this.isButtonDisable = this.isButtonDisable.bind(this);
    this.submmitLogin = this.submmitLogin.bind(this);
  }

  handleChange({ target }) {
    const name = target.id;
    const { value } = target;
    this.setState({
      [name]: value,
    }, this.isButtonDisable);
  }

  validEmail() {
    const { emailInput } = this.state;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(emailInput);
  }

  validPassword() {
    const { passwordInput } = this.state;
    const minLength = 6;
    return passwordInput.length >= minLength;
  }

  isButtonDisable() {
    const email = this.validEmail();
    const password = this.validPassword();
    const isDisabled = !(email && password);
    this.setState({
      isDisabled,
    });
  }

  submmitLogin() {
    const { emailInput } = this.state;
    const { dispatch, history } = this.props;
    dispatch(actAddUser(emailInput));

    history.push('/carteira');
  }

  render() {
    const { emailInput, passwordInput, isDisabled } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="emailInput">
            email
            <input
              id="emailInput"
              data-testid="email-input"
              type="email"
              value={ emailInput }
              onChange={ this.handleChange }
              placeholder="email"
            />
          </label>
          <label htmlFor="passwordInput">
            password
            <input
              id="passwordInput"
              data-testid="password-input"
              type="password"
              value={ passwordInput }
              onChange={ this.handleChange }
              placeholder="password"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.submmitLogin }
          >
            Entrar

          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Login);
