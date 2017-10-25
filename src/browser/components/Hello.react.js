import Component from 'react-pure-render/component';
import classNames from 'classnames';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./Hello.styl');
}

export default function Hello(props) {
  const className = classNames('hello', props.className);
  return (
    <div className={className}><span>{props.message}</span></div>
  );
}

Hello.propTypes = {
  className: React.PropTypes.string,
  message: React.PropTypes.string
}