import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Table.css';

class Table extends Component {
  render() {
    const { wallet } = this.props;
    console.log(wallet);
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
            <tr>
              <td>valor 1</td>
              <td>valor 2</td>
              <td>valor 3</td>
              <td>valor 4</td>
              <td>valor 5</td>
              <td>valor 6</td>
              <td>valor 7</td>
              <td>valor 8</td>
              <td>valor 9</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}
const mapStateToProps = (store) => ({
  wallet: { ...store.wallet },
});

export default connect(mapStateToProps)(Table);
