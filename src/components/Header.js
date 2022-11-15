import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

const inconUserSrc = 'https://thumbs.dreamstime.com/z/%C3%ADcone-do-avatar-usu%C3%A1rio-bot%C3%A3o-s%C3%ADmbolo-perfil-liso-da-pessoa-vetor-131363829.jpg';

class Header extends Component {
  render() {
    const { user: { email } } = this.props;
    return (
      <header className="flex-row-alig-items">
        <div>
          <h3>TRYBE WALLET</h3>
        </div>
        <div>
          <h3>
            {'Total de despesas: '}
            <span data-testid="total-field">{0}</span>
            <span data-testid="header-currency-field">{' BRL'}</span>
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

Header.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }).isRequired,
};

const mapStateToProps = (store) => ({
  user: store.user,
  wallet: store.wallet,
});

export default connect(mapStateToProps)(Header);
