import React, { Component, Fragment } from 'react';
import Contact from './Contact';
import { Consumer } from '../../Context';

export default class Contacts extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="display-3 mb-4"><span className="text-danger">Contact</span> List</h1>
        <Consumer>
          {context => context.contacts.map(contact => (
            <Contact
              key={contact.id}
              contact={contact}
            />
          ))
          }
        </Consumer>
      </Fragment>
    );
  }
}
