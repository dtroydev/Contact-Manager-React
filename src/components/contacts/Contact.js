import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../Context';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default class Contact extends Component {
  // type checks
  static propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
  };

  // state
  state = { showContactInfo: false };

  // view
  render() {
    // contact fields
    const {
      id, name, email, phone,
    } = this.props.contact;

    // click handlers
    const onShowButtonClick = () => {
      this.setState(prevState => ({ showContactInfo: !prevState.showContactInfo }));
    };

    const onDeleteButtonClick = (dispatch, deleteId) => {
      dispatch({ type: 'DELETE_CONTACT', payload: { id: deleteId } });
    };

    // buttons
    const deleteButton = <Consumer>
      {({ dispatch }) => (
        <i onClick={onDeleteButtonClick.bind(null, dispatch, id)}
          className="fas fa-times"
          style={{ cursor: 'pointer', float: 'right', color: 'red' }}>
        </i>
      )}
    </Consumer>;

    const showButton = <i onClick={onShowButtonClick}
      className="fas fa-sort-down"
      style={{ cursor: 'pointer' }}>
    </i>;

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
