import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from '../../routers/AppRouter';
import eventsMock from '../fixtures/eventsMock';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    checking: true,
  },
};
const store = mockStore(initialState);
// store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
  test('debe mostrar la leyenda "espere..."', () => {
    const initialState = {
      auth: {
        checking: true,
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').exists()).toBe(true);
  });

  test('debe mostrar la ruta pública', () => {
    const initialState = {
      auth: {
        checking: false,
        uid: null,
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('debe mostrar la ruta privada', () => {
    const initialState = {
      auth: {
        checking: false,
        uid: 'abc123',
        name: 'Serge',
      },
      calendar: {
        events: eventsMock,
      },
      ui: {
        modalOpen: false,
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
