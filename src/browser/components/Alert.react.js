import React from 'react';

if (process.env.IS_BROWSER) {
  require('./Alert.styl');
}

const Alert = (props, {desc = ''}) => {
  return (
    <div className="alert-message">
      Please choose your <span className="bold">{props.desc}</span>
    </div>
  );
}

Alert.propTypes = {
  desc: React.PropTypes.string
}

export default Alert;
