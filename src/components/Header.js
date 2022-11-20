import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

const inconUserSrc = 'https://thumbs.dreamstime.com/z/%C3%ADcone-do-avatar-usu%C3%A1rio-bot%C3%A3o-s%C3%ADmbolo-perfil-liso-da-pessoa-vetor-131363829.jpg';

class Header extends Component {
  constructor() {
    super();
    this.getTotal = this.getTotal.bind(this);
  }

  getTotal() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      const { currency, exchangeRates, value } = expense;
      const currencyAsk = exchangeRates[currency].ask;
      const callCotation = (+value * +currencyAsk);
      total += callCotation;
    });
    const totalFormated = total.toFixed(2).replace('.', ',');
    return totalFormated;
  }

  render() {
    const { email } = this.props;
    return (
      <header className="flex-row-alig-items">
        <div>
          <h3>TRYBE WALLET</h3>
        </div>
        <div>
          <h3>
            {'Total de despesas: '}
            <span data-testid="total-field">{ this.getTotal() }</span>
            <span data-testid="header-currency-field">{' BRL '}</span>
          </h3>
        </div>
        <div>
          <img
            className="imgIcon"
            src={ inconUserSrc }
            alt="icon"
            width={ 70 }
          />
          <h3 data-testid="email-field">{email}</h3>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      currency: PropTypes.shape({
        ask: PropTypes.number,
      }),
    }),
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
