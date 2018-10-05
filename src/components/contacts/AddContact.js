import React, { Component } from 'react';
import Input from '../layout/Input';
import { Consumer } from '../../Context';

export default class AddContact extends Component {
  static stateTemplate = {
    name: '',
    email: '',
    phone: '',
    errors: { name: '', email: '', phone: '' },
  };

  clearState() {
    this.setState(Object.assign({}, AddContact.stateTemplate));
  }

  state = Object.assign({}, AddContact.stateTemplate)

  // shouldComponentUpdate functionality testing
  // shouldComponentUpdate(nextProps, nextState) {
  //   const nameChanged = this.state.name !== nextState.name;
  //   const emailChanged = this.state.email !== nextState.email;
  //   const phoneChanged = this.state.phone !== nextState.phone;
  //   return nameChanged || emailChanged || phoneChanged;
  // }

  // arrow (this auto-bound) handlers
  onChange = (({ target: { name, value } }) => {
    console.log('AddContacts.js onChange() with value', value);
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  });

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    let { name, email, phone } = this.state;
    console.log('AddContact.js onSubmit()');

    // trim whitespace
    name = name.trim();
    email = email.trim();
    phone = phone.trim();

    // setup error object
    const errors = {
      name: name === '' ? 'Name must be provided!' : '',
      email: email === '' ? 'Email must be provided!' : '',
      phone: phone === '' ? 'Phone must be provided!' : '',
    };

    // if any errors re-render and skip context dispatch
    if (Object.values(errors).join('') !== '') {
      this.setState(prevState => ({ ...prevState, errors }));
      return;
    }

    // no errors, dispatch payload and then clear it
    dispatch({ type: 'ADD_CONTACT', payload: { name, email, phone } });
    this.clearState();
  }

  render() {
    console.log('AddContact.js render()');
    const submitButton = () => (
      <input className="btn btn-block btn-light" type="submit" />
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
