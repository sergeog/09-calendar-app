import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('Pruebas en <LoginScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe llamar el dispatch del login', () => {
    const loginEmail = 'serge@gmail.com';
    const loginPassword = '123456';
    wrapper.find('input[name="loginEmail"]').simulate('change', {
      target: {
        name: 'loginEmail',
        value: loginEmail,
      },
    });
    wrapper.find('input[name="loginPassword"]').simulate('change', {
      target: {
        name: 'loginPassword',
        value: loginPassword,
      },
    });

    wrapper
      .find('form')
      .at(0)
      .simulate('submit', {
        preventDefault() {},
      });

    expect(startLogin).toHaveBeenCalledWith(loginEmail, loginPassword);
  });

  test('debe fallar el registro de usuario si las contraseñas no coinciden', () => {
    const registerPassword1 = '123456';
    const registerPassword2 = '12345';
    wrapper.find('input[name="registerPassword1"]').simulate('change', {
      target: {
        name: 'registerPassword1',
        value: registerPassword1,
      },
    });
    wrapper.find('input[name="registerPassword2"]').simulate('change', {
      target: {
        name: 'registerPassword2',
        value: registerPassword2,
      },
    });
    wrapper
      .find('form')
      .at(1)
      .simulate('submit', {
        preventDefault() {},
      });

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Las contraseñas no coinciden',
      'error'
    );
    expect(startRegister).not.toHaveBeenCalled();
  });

  test('debe hacer el registro corectamente', () => {
    const registerName = 'Serge';
    const registerEmail = 'serge@gmail.com';
    const registerPassword1 = '123456';
    const registerPassword2 = '123456';

    wrapper.find('input[name="registerName"]').simulate('change', {
      target: {
        name: 'registerName',
        value: registerName,
      },
    });
    wrapper.find('input[name="registerEmail"]').simulate('change', {
      target: {
        name: 'registerEmail',
        value: registerEmail,
      },
    });
    wrapper.find('input[name="registerPassword1"]').simulate('change', {
      target: {
        name: 'registerPassword1',
        value: registerPassword1,
      },
    });
    wrapper.find('input[name="registerPassword2"]').simulate('change', {
      target: {
        name: 'registerPassword2',
        value: registerPassword2,
      },
    });

    wrapper
      .find('form')
      .at(1)
      .simulate('submit', {
        preventDefault() {},
      });

    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith(
      registerEmail,
      registerPassword1,
      registerName
    );
  });
});
