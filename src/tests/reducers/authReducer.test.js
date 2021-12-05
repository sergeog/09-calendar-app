import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initialState = {
  checking: true,
};

describe('Pruebas en el authReducer.js', () => {
  test('debe retornar el estado por defecto', () => {
    const state = authReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  test('debe realizar el AUTH_LOGIN', () => {
    const action = {
      type: types.AUTH_LOGIN,
      payload: {
        uid: 'abc123',
        name: 'Serge',
      },
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual({ checking: false, uid: 'abc123', name: 'Serge' });
  });

  test('debe realizar el AUTH_CHECKING_FINISH', () => {
    const action = {
      type: types.AUTH_CHECKING_FINISH,
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ checking: false });
  });

  test('debe realizar el AUTH_LOGOUT', () => {
    const action = {
      type: types.AUTH_LOGOUT,
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ checking: false });
  });
});
