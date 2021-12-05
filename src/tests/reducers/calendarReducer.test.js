import { calendarReducer } from '../../reducers/calendarReducer';
import { types } from '../../types/types';
import eventsMock from '../fixtures/eventsMock';
const initialState = {
  events: [],
  activeEvent: null,
};

describe('Pruebas en calendarReducer.js', () => {
  test('debe retornar el estado por defecto', () => {
    const state = calendarReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  test('debe realizar el EVENT_SET_ACTIVE', () => {
    const currentState = {
      ...initialState,
      events: eventsMock,
    };
    const action = {
      type: types.EVENT_SET_ACTIVE,
      payload: eventsMock[0],
    };
    const state = calendarReducer(currentState, action);

    expect(state).toEqual({ events: eventsMock, activeEvent: eventsMock[0] });
  });

  test('debe realizar el EVENT_ADD_NEW', () => {
    const currentState = {
      ...initialState,
      events: eventsMock,
    };
    const newEvent = {
      title: 'Cita con la crush 2',
      notes: 'Segunda cita',
      start: '2021-02-21T14:00:00.000Z',
      end: '2021-02-21T23:00:00.000Z',
      user: {
        _id: '600e152df12cf81df2356900',
        name: 'Serge',
      },
      id: '6029d93da7294c72a257591c',
    };
    const action = {
      type: types.EVENT_ADD_NEW,
      payload: newEvent,
    };
    const state = calendarReducer(currentState, action);

    expect(state).toEqual({
      events: [...eventsMock, { ...newEvent }],
      activeEvent: null,
    });
  });

  test('debe realizar el EVENT_CLEAR_ACTIVE', () => {
    const action = {
      type: types.EVENT_CLEAR_ACTIVE,
    };
    const state = calendarReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  test('debe realizar el EVENT_UPDATED', () => {
    const currentState = {
      ...initialState,
      events: eventsMock,
    };
    const eventToUpdate = {
      title: 'Conquistar a la crush',
      notes: 'Voy a tener suerte',
      start: '2021-02-22T14:00:00.000Z',
      end: '2021-02-22T23:00:00.000Z',
      user: {
        _id: '600e152df12cf81df2356900',
        name: 'Serge',
      },
      id: '6029d93da7294c72a257591b',
    };

    const action = {
      type: types.EVENT_UPDATED,
      payload: eventToUpdate,
    };
    const state = calendarReducer(currentState, action);
    expect(state).toEqual({
      events: eventsMock.map((event) =>
        event.id === eventToUpdate.id ? eventToUpdate : event
      ),
      activeEvent: null,
    });
  });

  test('debe realizar el EVENT_DELETED', () => {
    const activeEvent = {
      title: 'Jugar videojuegos',
      notes: '',
      start: '2021-02-16T00:00:00.042Z',
      end: '2021-02-16T02:00:00.000Z',
      user: {
        _id: '600e152df12cf81df2356900',
        name: 'Serge',
      },
      id: '6029a845165f9946e46a09bf',
    };
    const currentState = {
      ...initialState,
      events: eventsMock,
      activeEvent,
    };
    const action = {
      type: types.EVENT_DELETED,
    };
    const state = calendarReducer(currentState, action);
    expect(state).toEqual({
      events: eventsMock.filter((event) => event.id !== activeEvent.id),
      activeEvent: null,
    });
  });

  test('debe realizar el EVENT_LOADED', () => {
    const action = {
      type: types.EVENT_LOADED,
      payload: eventsMock,
    };
    const state = calendarReducer(initialState, action);
    expect(state).toEqual({ events: eventsMock, activeEvent: null });
  });

  test('debe realizar el EVENT_LOGOUT', () => {
    const action = {
      type: types.EVENT_LOGOUT,
    };
    const state = calendarReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
