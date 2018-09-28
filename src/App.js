// ui library
import React, { Component } from 'react';

// ui styling
import 'bootstrap/dist/css/bootstrap.min.css';

// ui additional components
import Header from './components/Header';
import Contacts from './components/Contacts';

// ui root component
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header branding="Contact Manager" />
        <div className="container">
          <Contacts />
        </div>
      </div>
    );
  }
}
