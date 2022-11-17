export const ADD_WALLET = 'ADD_WALLET';

export const actAddWallet = (wallet) => ({
  type: ADD_WALLET,
  wallet,
});

// actions assincronas na página de Login
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const actFecthAPI = ({ type: REQUEST_API });

export const actGetCurrencies = (currencies) => ({ type: GET_CURRENCIES, currencies });

export function thunkFetchCurrencies() {
  return async (dispatch) => {
    try {
      const request = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await request.json();
      const currencies = Object.keys(json).filter((coin) => coin !== 'USDT'); // [m1, m2, m3]
      return dispatch(actGetCurrencies(currencies));
    } catch (error) {
      console.log(error);
    }
  };
}

// actions assincronas na página do walletForm
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const actGetExpenses = (expenses) => (
  { type: ADD_EXPENSES, expenses });

export function thunkFetchQuotation(walletFormInputs) {
  return async (dispatch) => {
    try {
      const request = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await request.json();
      const expenses = { ...walletFormInputs, exchangeRates: json };
      console.log(expenses);
      return dispatch(actGetExpenses(expenses));
    } catch (error) {
      console.log(error);
    }
  };
}
