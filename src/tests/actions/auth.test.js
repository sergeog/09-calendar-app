import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
import {
  startChecking,
  startLogin,
  startLogout,
  startRegister,
} from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
Storage.prototype.setItem = jest.fn();

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

let token = '';

describe('Pruebas en actions/auth.js', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('debe hacer el login correctamente - startLogin', async () => {
    await store.dispatch(startLogin('serge@gmail.com', '123456'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.AUTH_LOGIN,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );
    // console.log(localStorage.setItem.mock.calls[0][1]);
    token = localStorage.setItem.mock.calls[0][1];
  });

  test('debe fallar el login de usuario - startLogin', async () => {
    await store.dispatch(startLogin('serge@gmail.com', '123456789'));
    const actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Contraseña incorrecta',
      'error'
    );

    await store.dispatch(startLogin('serge@gmail2.com', '123456'));
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'El usuario con el email especifiado no existe',
      'error'
    );
  });

  test('debe registrar un nuevo usuario correctamente - startRegister', async () => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'Test',
          token: 'ABC123ABC123',
        };
      },
    }));
    await store.dispatch(startRegister('test@test.com', '123456', 'Test'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.AUTH_LOGIN,
      payload: {
        uid: '123',
        name: 'Test',
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );
  });

  test('debe fallar el registro de usuario - startRegister', async () => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: false,
          message: 'Error al registrar usuario',
        };
      },
    }));
    await store.dispatch(startRegister('test@test.com', '123456', 'Test'));

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Error al registrar usuario',
      'error'
    );
  });

  test('debe renovar el token correctamente - startChecking', async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'Test',
          token: 'ABC123ABC123',
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.AUTH_LOGIN,
      payload: {
        uid: '123',
        name: 'Test',
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );
  });

  test('debe fallar en la renovación del token - startChecking', async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: false,
          message: 'Error en la renovación del token',
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.AUTH_CHECKING_FINISH,
    });
  });

  test('debe realizar el logout del usuario - startLogout', async () => {
    Storage.prototype.clear = jest.fn();
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.EVENT_LOGOUT,
    });
    expect(actions[1]).toEqual({
      type: types.AUTH_LOGOUT,
    });
  });
});
