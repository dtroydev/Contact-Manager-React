// ui library
import React, { Component } from 'react';

// routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// ui styling
import 'bootstrap/dist/css/bootstrap.min.css';

// ui additional components
import Header from './components/layout/Header';
import About from './components/pages/About';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import NotFound from './components/pages/NotFound';

import { Provider } from './Context';

// ui root component
export default class App extends Component {
  render() {
    return (
      <Provider>
        <Router basename={`${process.env.PUBLIC_URL}/`}>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about/" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
