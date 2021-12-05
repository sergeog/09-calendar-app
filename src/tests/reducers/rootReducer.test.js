import { createStore } from 'redux';

import { authReducer } from '../../reducers/authReducer';
import { calendarReducer } from '../../reducers/calendarReducer';
import { rootReducer } from '../../reducers/rootReducer';
import { uiReducer } from '../../reducers/uiReducer';

describe('Pruebas en rootReducer.js', () => {
  test('deben combinarse todos los reducers', () => {
    const store = createStore(rootReducer);
    const rootState = store.getState();
    const uiState = uiReducer(undefined, {});
    const calendarState = calendarReducer(undefined, {});
    const authState = authReducer(undefined, {});

    expect(rootState.ui).toEqual(uiState);
    expect(rootState.calendar).toEqual(calendarState);
    expect(rootState.auth).toEqual(authState);
  });
});
