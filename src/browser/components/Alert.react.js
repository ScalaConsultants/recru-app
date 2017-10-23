import React from 'react';

if (process.env.IS_BROWSER) {
  require('./Alert.styl');
}

export default function Alert(props) {
  return (
    <div className="alert-message">
      Please choose your <strong>{props.desc}</strong>
    </div>
  );
}
