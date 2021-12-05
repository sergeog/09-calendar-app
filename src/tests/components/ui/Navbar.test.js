import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { Navbar } from '../../../components/ui/Navbar';
import { startLogout } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    name: 'Serge',
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Navbar />
  </Provider>
);

describe('Pruebas en <Navbar />', () => {
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe hacer click en Salir', () => {
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
  });
});
