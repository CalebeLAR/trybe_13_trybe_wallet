import { ADD_USER } from '../actions/userActions';

const USER_INITIAL_STATE = {
  // user: {
  email: 'none',
  // },
};

// o initial state é uma "chave" onde o reducer incluirá as modificações
// o reducer "user" pode retornar 500 chaves ou objetos, mas todas dentro da chave user

const user = (store = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return ({
      email: action.user,
    });
  default:
    return store;
  }
};

export default user;
