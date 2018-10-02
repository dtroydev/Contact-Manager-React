import React, { Component } from 'react';
// import nanoid from 'nanoid';
import Contact from './Contact';
import { Consumer } from '../../Context';

export default class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {context => context.contacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
          />
        ))
        }
      </Consumer>
    );
  }
}
