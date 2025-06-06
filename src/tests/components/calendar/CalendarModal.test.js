import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import {
  eventClearActive,
  eventStartAddNew,
  eventStartUpdate,
} from '../../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActive: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initialState = {
  auth: {
    uid: 'abc123',
  },
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola mundo',
      notes: 'Algunas notas',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  ui: {
    modalOpen: true,
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe('Pruebas en <CalendarModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe de mostrar el modal', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('debe llamar la acción de actualizar y cerrar el modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(
      initialState.calendar.activeEvent
    );
    expect(eventClearActive).toHaveBeenCalled();
  });

  test('debe mostrar error si el título está vacío', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(
      true
    );
  });

  test('debe crear un nuevo evento', () => {
    const initialState = {
      auth: {
        uid: 'abc123',
      },
      calendar: {
        events: [],
        activeEvent: null,
      },
      ui: {
        modalOpen: true,
      },
    };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Título de prueba',
      },
    });
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.any(Date),
      start: expect.any(Date),
      notes: '',
      title: 'Título de prueba',
    });
    expect(eventClearActive).toHaveBeenCalled();
  });

  test('debe validar las fechas', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Título de prueba',
      },
    });
    const hoy = new Date();
    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
    });
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'La fecha fin debe ser mayor a la fecha de inicio',
      'error'
    );
  });
});
