import React from 'react';

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
}

AlertCustom.propTypes = {
  desc: React.PropTypes.string.isRequired,
  select: React.PropTypes.bool.isRequired,
}

export default AlertCustom;
