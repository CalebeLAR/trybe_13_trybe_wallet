import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <div>
        <div>WalletForm</div>
        <form>
          <label htmlFor="valueInput">
            valor da despesa:
            <input
              id="valueInput"
              type="text"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="descriptionInput">
            descrição da despesa:
            <input
              id="descriptionInput"
              type="textarea"
              data-testid="description-input"
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
          <label htmlFor="methodInput">
            Método de pagamento
            <select id="methodInput" data-testid="tag-input">
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

export default WalletForm;
