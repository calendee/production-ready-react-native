import { CHANGE_CONNECTION_STATUS } from '../actions/network';

export const initialState = {
  connected: false,
  hasCheckedStatus: false,
};

const isConnected = (status) => {
  if (status.toLowerCase() === 'none') {
    return false;
  }
  return true;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        hasCheckedStatus: true,
        connected: isConnected(action.status),
      };
    default:
      return state;
  }
};
