/* eslint no-sequences: "off" */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Input from '../layout/Input';
import { Consumer } from '../../Context';

export default class EditContact extends Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
  }

  state = {
    ...this.props
      .location
      .state
      .contacts
      .find(contact => contact.id === parseInt(this.props.match.params.id, 10)),
    errors: { name: '', email: '', phone: '' },
  };

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
    const { id } = this.state;
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
    const url = `https://jsonplaceholder.typicode.com/users/${this.state.id}`;
    const contact = {
      id, name, email, phone,
    };
    // there is an intentional duplicate dispatch in catch
    // due to mock api returning 404 for ids beyond 10
    try {
      const { data } = await axios.put(url, contact);
      dispatch({ type: 'UPDATE_CONTACT', payload: data });
    } catch (err) {
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: contact,
      });
    }

    // clear state and go to contact list

    this.props.history.push('/');
  }

  render() {
    const submitButton = () => (
      <input className="btn btn-block btn-light" type="submit" value="Update Contact" />
    );
    const {
      name, email, phone, errors,
    } = this.state;
    return (
      <div className="card mb-3">
        <div className="card-header">Update Contact</div>
        <div className="card-body">
          <Consumer>
            {({ dispatch }) => (
              <form onSubmit={this.onSubmit.bind(null, dispatch)}>
                <Input field="Name" value={name} onChange={this.onChange} error={errors.name} />
                <Input field="Email" value={email} onChange={this.onChange} type="email" error={errors.email} />
                <Input field="Phone" value={phone} onChange={this.onChange} error={errors.phone} />
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
