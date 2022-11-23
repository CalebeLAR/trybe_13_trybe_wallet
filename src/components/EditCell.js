import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actEditExpense } from '../redux/actions/walletActions';

class EditCell extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonSave = this.buttonSave.bind(this);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  buttonSave() {
    const { Allexpenses, editedExpense, dispatch, revertEdit } = this.props;
    const newExpense = { ...editedExpense, ...this.state };
    Allexpenses.forEach((expense, index) => {
      if (expense.id === editedExpense.id) {
        Allexpenses.splice(index, 1, newExpense);
      }
    });
    const newExpenses = [...Allexpenses];
    dispatch(actEditExpense(newExpenses));
    revertEdit();
  }

  render() {
    const { currencies, revertEdit } = this.props;
    const { value, currency, description, method, tag } = this.state;
    return (
      <tr>
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
        <td />
        <td />
        <td />
        <td>
          <button
            type="button"
            onClick={ () => this.buttonSave() }
          >
            Editar despesa
          </button>
          <button
            type="button"
            onClick={ () => revertEdit() }
          >
            Esquecer
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  Allexpenses: store.wallet.expenses,
});

EditCell.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editedExpense: PropTypes.shape({
    id: PropTypes.number.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  }).isRequired,
  revertEdit: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  Allexpenses: PropTypes.arrayOf(PropTypes.shape({
    exchangeRates: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(EditCell);
