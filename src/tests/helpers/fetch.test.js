import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Pruebas en el helper fetch', () => {
  let token = '';

  test('debe realizar el fetchWithoutToken por un método diferente a GET', async () => {
    const response = await fetchWithoutToken(
      'auth',
      { email: 'serge@gmail.com', password: '123456' },
      'POST'
    );

    expect(response instanceof Response).toBe(true);
    const body = await response.json();
    expect(body.ok).toBe(true);
    token = body.token;
  });

  test('debe fallar el fetchWithToken si el token no es especificado', async () => {
    const response = await fetchWithToken('events', {});
    const body = await response.json();
    expect(body).toEqual({
      ok: false,
      message: 'No hay token en la petición',
    });
  });

  test('debe funcionar el fetchWithToken por el método GET', async () => {
    localStorage.setItem('token', token);
    const response = await fetchWithToken('events', {});
    const body = await response.json();
    expect(body.ok).toBe(true);
  });

  test('debe funcionar el fetchWithToken por un método distinto a GET', async () => {
    localStorage.setItem('token', token);
    const response = await fetchWithToken(
      'events/601853c5f0f8c6318ef13702',
      {},
      'DELETE'
    );
    const body = await response.json();
    expect(body.message).toBe('Evento no encontrado');
  });
});
