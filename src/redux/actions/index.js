// ACTIONS CREATORS
export const ADD_USER = 'ADD_USER';
export const MOUNT_WALLET = 'MOUNT_WALLET';

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const mountWalet = (wallet) => ({
  type: MOUNT_WALLET,
  wallet,
});
