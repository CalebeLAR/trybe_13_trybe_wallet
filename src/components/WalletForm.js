import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      // request: undefined,
      valueInput: '',
      descriptionInput: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange({ target }) {
    const name = target.id;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  }

  fetchData() {
    // função que preenche o array de currencies, na store;
    console.log('fazer um dispatch para a store com o thunk');
  }

  render() {
    const { isFetching, valueInput, descriptionInput } = this.state;
    return (
      <div>
        <div>
          WalletForm
          {isFetching}

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
            <select id="currencyInput" data-testid="currency-input">
              <option value="moeda 1">moeda 1</option>
              <option value="moeda 2">moeda 2</option>
              <option value="moeda 3">moeda 3</option>
              <option value="moeda 4">moeda 4</option>
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
  wallet: store.wallet,
});

WalletForm.propTypes = ({
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
    editor: PropTypes.bool.isRequired,
    idToEdit: PropTypes.number.isRequired,
  }),
});

WalletForm.defaultProps = ({
  wallet: PropTypes.shape({
    currencies: [],
    expenses: [],
  }),
});

export default connect(mapStateToProps)(WalletForm);
