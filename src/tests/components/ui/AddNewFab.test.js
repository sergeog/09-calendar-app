import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AddNewFab } from '../../../components/ui/AddNewFab';
import { uiOpenModal } from '../../../actions/ui';

jest.mock('../../../actions/ui', () => ({
  uiOpenModal: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <AddNewFab />
  </Provider>
);

describe('Pruebas en <AddNewFab />', () => {
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe hacer click en el botón', () => {
    wrapper.find('button').simulate('click');
    expect(uiOpenModal).toHaveBeenCalled();
  });
});
