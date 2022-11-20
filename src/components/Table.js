import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actEditExpense } from '../redux/actions/walletActions';
import './Table.css';

class Table extends Component {
  constructor() {
    super();
    this.getCurrencyName = this.getCurrencyName.bind(this);
    this.getCurrencyASK = this.getCurrencyASK.bind(this);
    this.getExpenseCotation = this.getExpenseCotation.bind(this);
    this.getExpenseValue = this.getExpenseValue.bind(this);
    this.buttonEdit = this.buttonEdit.bind(this);
  }

  getCurrencyName(expense) {
    const { currency, exchangeRates } = expense;
    const currencyName = exchangeRates[currency].name;
    return currencyName;
  }

  getCurrencyASK(expense) {
    const { currency, exchangeRates } = expense;
    const currencyASK = exchangeRates[currency].ask;
    const askFormat = parseFloat(currencyASK).toFixed(2);
    return askFormat;
  }

  getExpenseCotation(expense) {
    const { currency, exchangeRates, value } = expense;
    const currencyASK = exchangeRates[currency].ask;
    const valueCotation = (value * currencyASK).toFixed(2);
    return valueCotation;
  }

  getExpenseValue(expense) {
    const { value } = expense;
    let formatedValue = '00,00';
    const thereIsPoint = value.includes('.');
    const thereIsComma = value.includes(',');
    if (!thereIsPoint && !thereIsComma) {
      formatedValue = `${value}.00`;
    } else {
      formatedValue = `${value}`.replace(',', '.');
    }
    return formatedValue;
  }

  buttonEdit(id) {
    const { dispatch } = this.props;
    dispatch(actEditExpense(id));
    console.log('click', id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <section>
        <samp>Table</samp>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{this.getExpenseValue(expense)}</td>
                  <td>{this.getCurrencyName(expense)}</td>
                  <td>{this.getCurrencyASK(expense)}</td>
                  <td>{this.getExpenseCotation(expense)}</td>
                  <td>BRL</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => (this.buttonEdit(expense.id)) }
                    >
                      editar/excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}
const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      name: PropTypes.string,
      ask: PropTypes.string,
    }),
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
