import { messages } from '../../helpers/calendar-messages-es';

describe('Pruebas en helper Calendar messages', () => {
  test('deben ser iguales', () => {
    expect(messages).toEqual({
      allDay: 'Todo el día',
      previous: '<',
      next: '>',
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      agenda: 'Agenda',
      date: 'Fecha',
      time: 'Hora',
      event: 'Evento',
      noEventsInRange: 'No hay eventos en este rango',
      showMore: expect.any(Function),
    });
  });

  test('debe ejecutarse correctamente la función showMore', () => {
    const total = 10;
    expect(messages.showMore(total)).toBe(`+ Ver más (${total})`);
  });
});
