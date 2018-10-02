import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';

const { Provider: ContextProvider, Consumer } = React.createContext();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_CONTACT': // provisional
      return {
        ...state,
        contacts: state.contacts.push(payload),
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== payload),
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  constructor() {
    super();

    const contactsDB = [
      ['John Doe', 'jdoe@example.com', '01 0101 1100'],
      ['Karen Smith', 'ksmith@example.com', '01 1010 0011'],
      ['Jack Brown', 'jbrown@example.com', '01 0012 0011'],
      ['Vanessa Clarence', 'vclarence@example.com', '01 0330 0011'],
    ];

    this.state = {
      contacts: contactsDB.map(([name, email, phone]) => (
        {
          id: nanoid(), name, email, phone,
        }
      )),
      dispatch: action => this.setState(state => reducer(state, action)),
    };
  }

  // addContact doesn't use 'this', so works as a Static Method
  render() {
    const { state, props: { children } } = this;
    return (
      <ContextProvider value={state}>
        {children}
      </ContextProvider>
    );
  }
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export { Consumer };
