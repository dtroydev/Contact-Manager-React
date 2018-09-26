import React, { Component } from 'react';
import Header from './components/Header';
import Contact from './components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header branding="Contact Manager" />
        <div className="container">
          <Contact
            name="John Doe"
            email="jdoe@example.com"
            phone="01 0010 0011"
          />
          <Contact
            name="Karen Smith"
            email="ksmith@example.com"
            phone="01 0011 0100 "
          />
        </div>
      </div>
    );
  }
}
