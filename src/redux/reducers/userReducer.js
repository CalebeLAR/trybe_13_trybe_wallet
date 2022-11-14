import { ADD_USER } from '../actions/userActions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const userReducer = (store = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return ({
      ...store,
      user: action.user,
    });
  default:
    return store;
  }
};

export default userReducer;
