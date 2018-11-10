import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Contact from './Contact';
import { getContacts } from '../../actions/contactActions';

class Contacts extends Component {
  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    const { contacts } = this.props;
    return (
      <React.Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-danger">Contact</span> List
        </h1>
        {contacts.map(contact => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </React.Fragment>
    );
  }
}

// map relevant redux reducer state to instance prop
const mapStateToProps = state => ({
  contacts: state.contact.contacts,
});

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  getContacts: PropTypes.func.isRequired,
};

// if an object with functions is passed to mapDispatchToProps (2nd arg), it is assumed
// that the functions are action creators, same key props will be created
// essentially as follows
// this.props[name] = function () { dispatch(actionCreate.apply(this, args)) }

export default connect(mapStateToProps, { getContacts })(Contacts);
