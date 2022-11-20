import { ADD_WALLET,
  GET_CURRENCIES, ADD_EXPENSES, EDIT_EXPENSE } from '../actions/walletActions';

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
  case GET_CURRENCIES:
    return ({
      ...store,
      currencies: action.currencies,
    });
  case ADD_EXPENSES:
    return ({
      ...store,
      expenses: [...store.expenses, action.expenses],
    });
  case EDIT_EXPENSE:
    return ({
      ...store,
      expenses: [...store.expenses.filter((expense) => expense.id !== action.expenseId),
      ],
    });
  default:
    return store;
  }
};

export default wallet;
