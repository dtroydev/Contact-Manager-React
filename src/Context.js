import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import nanoid from 'nanoid';
import axios from 'axios';

const { Provider: ContextProvider, Consumer } = React.createContext();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_CONTACT': {
      const {
        id, name, email, phone,
      } = payload;
      let {
        company,
      } = payload;
      if (company === undefined) company = { name: 'None' };
      return {
        ...state,
        contacts: [{
          id, name, email, phone, company,
        }, ...state.contacts],
      };
    }
    case 'UPDATE_CONTACT': {
      const { id } = payload;
      return {
        ...state,
        contacts: [...state.contacts.filter(contact => contact.id !== id), { ...payload }],
      };
    }
    case 'DELETE_CONTACT': {
      const { id } = payload;
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== id),
      };
    }
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => this.setState(state => reducer(state, action)),
  };

  async componentDidMount() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const { data } = await axios.get(url);
    this.setState(({ contacts: data }));
  }

  // addContact doesn't use 'this', so works as a Static Method
  render() {
    const { state, props: { children } } = this;
    return (
      <ContextProvider value={state} >
        {children}
      </ContextProvider>
    );
  }
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export { Consumer };
