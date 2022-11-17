import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  thunkFetchCurrencies, thunkFetchQuotation } from '../redux/actions/walletActions';
import './WalletForm.css';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      // isFetching: false,
      id: 0,
      value: '',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',

    };

    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.clearAllInputs = this.clearAllInputs.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(thunkFetchCurrencies());
  }

  handleChange({ target }) {
    const name = target.id;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  }

  clearAllInputs() {
    this.setState({
      value: '',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  addExpense() {
    const { dispatch } = this.props;
    this.setState((prevState) => {
      this.setState({
        id: prevState.id + 1,
      });
    }, () => {
      dispatch(thunkFetchQuotation(this.state));
      this.clearAllInputs();
    });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies } = this.props;
    return (
      <div>

        <form className="walletForm">
          <label htmlFor="value">
            Valor da despesa:
            <input
              data-testid="value-input"
              id="value"
              type="text"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição da despesa:
            <input
              data-testid="description-input"
              id="description"
              type="textarea"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <br />
            <select
              data-testid="currency-input"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((cur) => (
                  <option key={ cur } value={ cur }>{ cur }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria para a despesa (tag)
            <select
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.addExpense }
          >
            Adicionar despesa
          </button>
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
