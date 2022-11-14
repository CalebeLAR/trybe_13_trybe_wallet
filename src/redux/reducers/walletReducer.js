import { ADD_WALLET } from '../actions/walletActions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const walletReducer = (store = INITIAL_STATE, action) => {
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

export default walletReducer;
