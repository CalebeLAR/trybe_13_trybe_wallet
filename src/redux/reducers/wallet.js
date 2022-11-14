import { ADD_WALLET } from '../actions/walletActions';

const WALLET_INITIAL_STATE = {
  // wallet: {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  // },
};

const wallet = (store = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET:
    return ({
      ...store,
      wallet: action.wallet,
    });
  default:
    return store;
  }
};

export default wallet;
