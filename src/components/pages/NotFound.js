import React from 'react';
import PropTypes from 'prop-types';

const Page404 = props => (
  <div>
    <h1 className="display-4"><span className="text-danger">404</span> Page Not Found</h1>
    <p className="lead"><span className="text-danger">{props.location.pathname}</span> does not exist..</p>
  </div>
);

Page404.propTypes = {
  location: PropTypes.object,
};

export default Page404;
