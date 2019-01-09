import React from 'react';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./AlertCustom.styl');
}


const AlertCustom = (props, {desc = '', select = false}) => {
  return (
    <div>
      { props.select &&
        <div className="alert-custom-message">
          {props.desc}
        </div>
      }
    </div>
  );
};

AlertCustom.propTypes = {
  desc: PropTypes.string.isRequired,
  select: PropTypes.bool.isRequired,
};

export default AlertCustom;
