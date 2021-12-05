import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import eventsMock from '../../fixtures/eventsMock';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventClearActive, eventSetActive } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
  eventClearActive: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    uid: 'abc123',
  },
  calendar: {
    events: eventsMock,
    activeEvent: eventsMock[0],
  },
  ui: {
    modalOpen: false,
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();
Storage.prototype.setItem = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe('Pruebas en <CalendarScreen />', () => {
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe obtener los mensajes del calendario correctamente', () => {
    const calendar = wrapper.find('Calendar');
    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).toEqual(messages);
  });

  test('debe realizar el evento onDoubleClickEvent', () => {
    const calendar = wrapper.find('Calendar');
    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.UI_OPEN_MODAL });
  });

  test('debe realizar el evento onSelectEvent', () => {
    const calendar = wrapper.find('Calendar');
    calendar.prop('onSelectEvent')({ start: 'hello' });
    // expect(store.dispatch).toHaveBeenCalledWith({
    //   type: types.EVENT_SET_ACTIVE,
    //   payload: { start: 'hello' },
    // });
    expect(eventSetActive).toHaveBeenCalledWith({ start: 'hello' });
  });

  test('debe realizar el evento onView', () => {
    const calendar = wrapper.find('Calendar');
    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
    });
  });

  test('debe realizar el evento eventPropGetter cuando el uid sea igual al que contiene el evento', () => {
    const calendar = wrapper.find('Calendar');
    const event = {
      user: { _id: 'abc123' },
    };
    calendar.prop('eventPropGetter')(event);
  });

  test('debe realizar el evento eventPropGetter cuando el uid sea diferente al que contiene el evento', () => {
    const calendar = wrapper.find('Calendar');
    const event = {
      user: { _id: 'abc12' },
    };
    calendar.prop('eventPropGetter')(event);
  });

  test('debe realizar el evento onSelectSlot', () => {
    const calendar = wrapper.find('Calendar');
    calendar.prop('onSelectSlot')();
    expect(eventClearActive).toHaveBeenCalled();
  });

  test('debe existir el componente <DeleteEventFab />  cuando haya un evento activo', () => {
    expect(wrapper.find('DeleteEventFab').exists()).toBe(true);
  });
});
