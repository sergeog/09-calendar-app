import { types } from '../types/types';

const initialState = {
  checking: true,
  // uid: null,
  // name: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.AUTH_CHECKING_FINISH:
      return {
        ...state,
        checking: false,
      };

    case types.AUTH_LOGOUT:
      return { checking: false };

    default:
      return state;
  }
};
