import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  field, value, type, onChange, error,
}) => {
  console.log('Input Component prop check for field:', field, 'value:', value, 'type:', type, 'error:', error);
  const name = field.toLowerCase();
  const id = `addContact-Form-${field}`;
  const placeholder = `Enter ${field}...`;
  const inputOuterClass = 'form-group';
  const inputInnerClass = 'form-control form-control-lg';
  const errorClass = err => (err !== '' ? 'is-invalid' : '');
  return (
    <div key={field} className={inputOuterClass}>
      <label htmlFor={id}>{field}</label>
      <input
        name={name}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`${inputInnerClass} ${errorClass(error)}`}
        onChange={onChange}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

Input.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Input;
