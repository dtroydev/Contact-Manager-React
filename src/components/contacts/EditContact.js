import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInputGroup from '../layout/TextInputGroup';
import { getContact, updateContact } from '../../actions/contactActions';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
    placeholder: 'Loading...',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id).then(() => {
      this.setState({ ...this.state, ...this.props.contact, placeholder: null });
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      id, name, email, phone,
    } = this.state;

    // Check For Errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const contact = {
      id,
      name,
      email,
      phone,
    };

    // // UPDATE CONTACT ////
    // Clear State
    this.props.updateContact(contact);

    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      name, email, phone, errors,
    } = this.state;
    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder={this.state.placeholder ? this.state.placeholder : 'Enter Name...'}
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder={this.state.placeholder ? this.state.placeholder : 'Enter Email...'}
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              placeholder={this.state.placeholder ? this.state.placeholder : 'Enter Phone...'}
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

// map relevant redux reducer state to instance prop
const mapStateToProps = state => ({
  contact: state.contact.contact,
});

EditContact.propTypes = {
  match: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// export default EditContact;
export default connect(mapStateToProps, { getContact, updateContact })(EditContact);
