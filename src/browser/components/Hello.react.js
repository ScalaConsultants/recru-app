import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./Hello.styl');
}

const Hello = props => {
  const className = classNames('hello', props.className);
  return (
    <div className={className}><span>{props.message}</span></div>
  );
};

Hello.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired
};

export default Hello;
