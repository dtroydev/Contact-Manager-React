// ui library
import React, { Component } from 'react';

// ui styling
import 'bootstrap/dist/css/bootstrap.min.css';

// ui additional components
import Header from './components/layout/Header';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';

import { Provider } from './Context';

// ui root component
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header branding="Contact Manager" />
        <div className="container">
          <Provider>
            <AddContact />
            <Contacts />
          </Provider>
        </div>
      </div>
    );
  }
}
