import React from 'react';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./Alert.styl');
}

const Alert = (props, {desc = '', select = false}) => {
  return (
    <div>
      { props.select &&
        <div className="alert-message">
          Please choose your <span className="bold">{props.select} {props.desc}</span>
        </div>
      }
    </div>
  );
};

Alert.propTypes = {
  desc: PropTypes.string.isRequired,
  select: PropTypes.bool.isRequired,
};

export default Alert;
