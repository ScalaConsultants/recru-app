import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./MessageOverlay.styl');
}

const MessageOverlay = props => {
  const className = classNames('message-overlay', props.className);
  return (
    <div className={className}>
      <div>
        <span>{props.title}</span>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

MessageOverlay.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string
};

export default MessageOverlay;
