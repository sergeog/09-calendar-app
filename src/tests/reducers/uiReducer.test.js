import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

const initialState = {
  modalOpen: false,
};

describe('Pruebas en uiReducer', () => {
  test('debe retornar el estado por defecto', () => {
    const state = uiReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  test('debe abrir el modal', () => {
    const action = uiOpenModal();
    const state = uiReducer(initialState, action);
    expect(state).toEqual({ modalOpen: true });
  });

  test('debe cerrar el modal', () => {
    const action = uiCloseModal();
    const state = uiReducer(initialState, action);
    expect(state).toEqual({ modalOpen: false });
  });
});
