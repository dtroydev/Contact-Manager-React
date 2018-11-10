import {
  GET_CONTACTS, DELETE_CONTACT, ADD_CONTACT, GET_CONTACT, UPDATE_CONTACT,
} from './types';

// fetch shorthand for json GET promise
const fetchJSON = async url => fetch(url)
  .then((res) => {
    if (res.status < 200 || res.status > 299) {
      throw new Error(res.status);
    } else return res;
  })
  .then(res => res.json())
  .catch(err => console.log(err.message));

// action creator
export const getContacts = () => async (dispatch) => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  dispatch({ type: GET_CONTACTS, payload: await fetchJSON(url) });
};

export const getContact = id => async (dispatch) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const payload = { id: parseInt(id, 10), ...await fetchJSON(url) };
  dispatch({ type: GET_CONTACT, payload });
};

export const updateContact = contact => async (dispatch) => {
  const { id } = contact;
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const payload = { ...contact, id: parseInt(id, 10) };
  fetch(url, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(contact),
  })
    .then((res) => {
      if (res.status < 200 || res.status > 299) {
        // workaround for mock api
        dispatch(({ type: UPDATE_CONTACT, payload }));
        throw new Error(res.status);
      } else return res;
    })
    .then(response => response.json())
    .then(json => dispatch(({ type: UPDATE_CONTACT, payload: json })))
    .catch(err => console.log(err.message));
};

export const deleteContact = id => async (dispatch) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  fetch(url, { method: 'delete' })
    .then(response => response.json())
    .then(json => console.log(json));
  dispatch(({ type: DELETE_CONTACT, payload: id }));
};

export const addContact = contact => async (dispatch) => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(contact),
  }).then(response => response.json())
    .then(json => dispatch(({ type: ADD_CONTACT, payload: json })));
};

export default {};
