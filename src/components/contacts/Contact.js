import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Consumer } from '../../Context';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default class Contact extends Component {
  // type checks
  static propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      company: PropTypes.shape({
        name: PropTypes.string.isRequred,
      }),
    }),
  };

  // state
  state = { showContactInfo: false };

  // view
  render() {
    // contact fields
    const {
      id, name, email, phone, // company: { name: company },
    } = this.props.contact;

    // click handlers
    const onShowButtonClick = () => {
      this.setState(prevState => ({ showContactInfo: !prevState.showContactInfo }));
    };

    const onDeleteButtonClick = async (dispatch, deleteId) => {
      // there is an intentional duplicate dispatch in catch
      // due to mock api returning 404 for ids beyond 10
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${deleteId}`);
        dispatch({ type: 'DELETE_CONTACT', payload: { id: deleteId } });
      } catch (e) { // due to mock api returning 404
        dispatch({ type: 'DELETE_CONTACT', payload: { id: deleteId } });
      }
    };

    // buttons
    const deleteButton = <Consumer>
      {({ dispatch }) => (
        <i onClick={onDeleteButtonClick.bind(null, dispatch, id)}
          className="fas fa-times"
          style={{
            cursor: 'pointer',
            float: 'right',
            color: 'red',
          }}>
        </i>
      )}
    </Consumer>;

    const editButton = <Consumer>
      {
        ({ contacts }) => <Link to={{ pathname: `/contact/edit/${id}`, state: { contacts } }}>
          <i className="fas fa-pencil-alt fa-xs"
            style={{
              cursor: 'pointer',
              float: 'right',
              marginTop: '0.1rem',
              marginRight: '1rem',
              color: 'black',
            }}>
          </i>
        </Link>
      }
    </Consumer>;

    const showButton = <span> <i onClick={onShowButtonClick}
      className={`fas fa-sort-${this.state.showContactInfo ? 'up' : 'down'}`}
      style={{ cursor: 'pointer' }}>
    </i></span>;

    // hideable contact info
    const contactInfo = this.state.showContactInfo
      ? <ul className="list-group">
        <li className="list-group-item">Email: {email}</li>
        <li className="list-group-item">Phone: {phone}</li>
        {/* <li className="list-group-item">Company: {company}</li> */}
      </ul> : '';

    // put it all together and send it out :-)
    return (
      <div className="card card-body mb-3" >
        <h4>{name}{showButton}{deleteButton}{editButton}</h4>
        {contactInfo}
      </div >
    );
  }
}
