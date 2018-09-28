import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default class Contact extends Component {
  constructor() {
    super();
    this.state = { showContactInfo: true };
  }

  // view
  render() {
    // contact fields
    const { name, email, phone } = this.props.contact;
    // click handlers
    const onShowButtonClick = () => {
      console.log(`${this.props.contact.name} visibilty button clicked`);
      this.setState({
        showContactInfo: !this.state.showContactInfo,
      });
    };

    const onDeleteButtonClick = () => {
      console.log(`${this.props.contact.name} delete button clicked`);
      // go to parent
      this.props.deleteContact(this.props.contact.id);
    };
    // buttons
    const deleteButton = <i onClick={onDeleteButtonClick} className="fas fa-times"
      style={{ cursor: 'pointer', float: 'right', color: 'red' }}></i>;

    const showButton = <i onClick={onShowButtonClick} className="fas fa-sort-down"
      style={{ cursor: 'pointer' }}></i>;

    // hideable contact info
    const contactInfo = this.state.showContactInfo
      ? <ul className="list-group">
        <li className="list-group-item">Email: {email}</li>
        <li className="list-group-item">Phone: {phone}</li>
      </ul> : '';

    // put it all together and send it out :-)
    return (
      <div className="card card-body mb-3">
        <h4>{name}{showButton}{deleteButton}</h4>
        {contactInfo}
      </div >
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
  deleteContact: PropTypes.func.isRequired,
};
