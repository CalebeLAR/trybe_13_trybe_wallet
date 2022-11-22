import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EditCell extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: '',
      description: '',
      method: '',
      tag: '',
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
    console.log('save');
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
        <td>
          <button
            type="button"
            onClick={ this.buttonSave }
          >
            Salvar
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
});

EditCell.propTypes = {
  revertEdit: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  // expense: PropTypes.shape({

  // }).isRequired,
};

export default connect(mapStateToProps)(EditCell);
