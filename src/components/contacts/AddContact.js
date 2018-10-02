import React, { Component } from 'react';

export default class AddContact extends Component {
  state = {
    name: { value: '', type: 'text' },
    email: { value: '', type: 'email' },
    phone: { value: '', type: 'number' },
  };

  onChange = (({ target: { name, value } }) => {
    this.setState(prevState => ({
      [name]: { ...prevState[name], value },
    }));
  });

  onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit handler called, \nstate:', this.state);
  }

  render() {
    const inputFields = fields => (
      fields.map((field) => {
        const name = field.toLowerCase();
        const id = `addContact-Form-${field}`;
        const { type, value } = this.state[name];
        const placeholder = `Enter ${field}...`;
        const inputDivClass = 'form-group';
        const inputClass = 'form-control form-control-lg';
        return (
          <div key={field} className={inputDivClass}>
            <label htmlFor={id}>{field}</label>
            <input
              name={name}
              id={id}
              type={type}
              value={value}
              placeholder={placeholder}
              className={inputClass}
              onChange={this.onChange}
            />
          </div>
        );
      })
    );

    const submitButton = () => (
      <input className="btn btn-block btn-light" type="submit" />
    );

    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            {inputFields(['Name', 'Email', 'Phone'])}
            {submitButton()}
          </form>
        </div>
      </div >
    );
  }
}
