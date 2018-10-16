/* eslint no-sequences: "off" */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Input from '../layout/Input';
import { Consumer } from '../../Context';

export default class AddContact extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  static stateTemplate = {
    name: '',
    email: '',
    phone: '',
    errors: { name: '', email: '', phone: '' },
  };

  state = Object.assign({}, AddContact.stateTemplate)

  // arrow (this auto-bound) handlers
  onChange = (({ target: { name, value } }) => {
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    // trim whitespace
    let { name, email, phone } = this.state;
    name = name.trim();
    email = email.trim();
    phone = phone.trim();

    // setup error object
    const errors = {
      name: name === '' ? 'Name must be provided!' : '',
      email: email === '' ? 'Email must be provided!' : '',
      phone: phone === '' ? 'Phone must be provided!' : '',
    };

    // if any errors re-render and skip api/dispatch
    if (Object.values(errors).join('') !== '') {
      this.setState(prevState => ({ ...prevState, errors }));
      return;
    }
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/users/', { name, email, phone });
    dispatch({ type: 'ADD_CONTACT', payload: { ...data, id: Date.now() } });
    // go to contact list
    this.props.history.push('/');
  }

  render() {
    const submitButton = () => (
      <input className="btn btn-block btn-light" type="submit" value="Add Contact" />
    );
    const {
      name, email, phone, errors,
    } = this.state;
    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <Consumer>
            {({ dispatch }) => (
              <form onSubmit={this.onSubmit.bind(null, dispatch)}>
                <Input field="Name" value={name} onChange={this.onChange} error={errors.name} />
                <Input field="Email" value={email} onChange={this.onChange} type="email" error={errors.email} />
                <Input field="Phone" value={phone} onChange={this.onChange} type="number" error={errors.phone} />
                {submitButton()}
              </form>
            )
            }
          </Consumer>
        </div>
      </div >
    );
  }
}
