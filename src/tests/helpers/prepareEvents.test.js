import { prepareEvents } from '../../helpers/prepareEvents';
import eventsMock from '../fixtures/eventsMock';

describe('Pruebas en helper prepareEvents', () => {
  test('debe retornar un array vacío si la lista de eventos está vacía', () => {
    const eventsPrepared = prepareEvents();
    expect(eventsPrepared).toEqual([]);
  });

  test('debe preparar la lista de eventos correctamente', () => {
    const eventsPrepared = prepareEvents(eventsMock);
    expect(eventsPrepared[0]).toEqual({
      title: expect.any(String),
      notes: expect.any(String),
      start: expect.any(Date),
      end: expect.any(Date),
      user: {
        _id: expect.any(String),
        name: expect.any(String),
      },
      id: expect.any(String),
    });
  });
});
