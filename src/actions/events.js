import Swal from 'sweetalert2';

import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const response = await fetchWithToken('events', event, 'POST');
      const body = await response.json();
      if (body.ok) {
        event.id = body.event.id;
        event.user = { _id: uid, name };

        dispatch(eventAddNew(event));
      }
      console.log(event);
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const response = await fetchWithToken('events');
      const body = await response.json();
      const events = prepareEvents(body.events);
      dispatch(eventsLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const response = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await response.json();
      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        console.log('body', body);
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const response = await fetchWithToken(`events/${id}`, {}, 'DELETE');
      const body = await response.json();
      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.EVENT_ADD_NEW,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.EVENT_SET_ACTIVE,
  payload: event,
});

export const eventClearActive = () => ({ type: types.EVENT_CLEAR_ACTIVE });

const eventUpdated = (event) => ({
  type: types.EVENT_UPDATED,
  payload: event,
});

const eventDeleted = () => ({ type: types.EVENT_DELETED });

const eventsLoaded = (events) => ({
  type: types.EVENT_LOADED,
  payload: events,
});

export const eventLogout = () => ({
  type: types.EVENT_LOGOUT,
});
