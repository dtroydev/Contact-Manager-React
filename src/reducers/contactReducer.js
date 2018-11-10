import {
  GET_CONTACTS, DELETE_CONTACT, ADD_CONTACT, GET_CONTACT, UPDATE_CONTACT,
} from '../actions/types';

const initialState = {
  contacts: [],
  contact: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS: {
      // local state has priority only add contacts from api that are not already here
      const newContacts = action.payload.filter(item => !state.contacts.find(
        i2 => i2.id === item.id,
      ));

      return {
        ...state, contacts: [...state.contacts, ...newContacts],
      };
    }
    case GET_CONTACT:
      // const contact =
      return {
        ...state, contact: state.contacts.filter(({ id }) => id === action.payload.id).shift(),
      };
    case DELETE_CONTACT:
      return {
        ...state, contacts: state.contacts.filter(({ id }) => id !== action.payload),
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: [
          ...state.contacts.map(contact => (
            contact.id === action.payload.id
              ? { ...contact, ...action.payload } : contact
          ))],
      };
    default: return state;
  }
};
