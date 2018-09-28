import React, { Component, Fragment } from 'react';
import nanoid from 'nanoid';
import Contact from './Contact';

export default class Contacts extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        Contacts.addContact('John Doe', 'jdoe@example.com', '01 0101 1100'),
        Contacts.addContact('Karen Smith', 'ksmith@example.com', '01 1010 0011'),
        Contacts.addContact('Jack Brown', 'jbrown@example.com', '01 0012 0011'),
        Contacts.addContact('Vanessa Clarence', 'vclarence@example.com', '01 0330 0011'),
      ],
    };
  }

  // addContact doesn't use this, so works as a Static Method
  static addContact(name, email, phone) {
    return {
      id: nanoid(), name, email, phone,
    };
  }

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  }

  render() {
    const { contacts } = this.state;
    return (
      <Fragment>
        {
          contacts.map(contact => (
            <Contact
              key={contact.id}
              contact={contact}
              deleteContact={this.deleteContact}
            />
          ))
        }
      </Fragment>
    );
  }
}
