import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/walletActions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      // isFetching: false,
      valueInput: '',
      currencyInput: '',
      descriptionInput: '',
      // tagInput: '',

    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  componentDidUpdate(prevProps) {
    const { currencies } = this.props;
    const { currencyInput } = this.state;

    // depois de toda a atualização no estado esse trecho de código é executado
    if (prevProps.currencies.length === 0 && currencyInput === '') {
      this.setState({
        currencyInput: currencies[0],
      });
    }
  }

  handleChange({ target }) {
    const name = target.id;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      // tagInput,
    } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <div>
          WalletForm
        </div>
        <form>
          <label htmlFor="valueInput">
            valor da despesa:
            <input
              data-testid="value-input"
              id="valueInput"
              type="text"
              value={ valueInput }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descriptionInput">
            descrição da despesa:
            <input
              data-testid="description-input"
              id="descriptionInput"
              type="textarea"
              value={ descriptionInput }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currencyInput">
            Moeda
            <select
              data-testid="currency-input"
              id="currencyInput"
              value={ currencyInput }
              onChange={ this.handleChange }
            >
              {
                currencies.map((currency) => (
                  <option key={ currency } value={ currency }>{ currency }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="methodInput">
            Método de pagamento
            <select id="methodInput" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Método de pagamento
            <select id="tagInput" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

WalletForm.propTypes = ({
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
});

// WalletForm.defaultProps = ({
//   currencies: [],
// });

export default connect(mapStateToProps)(WalletForm);
