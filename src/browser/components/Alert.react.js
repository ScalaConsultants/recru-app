import React from 'react';

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
  desc: React.PropTypes.string.isRequired,
  select: React.PropTypes.bool.isRequired,
};

export default Alert;
