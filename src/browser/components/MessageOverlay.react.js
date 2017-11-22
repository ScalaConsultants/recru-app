import Component from 'react-pure-render/component';
import classNames from 'classnames';
import React from 'react';

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
}

MessageOverlay.propTypes = {
  className: React.PropTypes.string,
  content: React.PropTypes.string,
  title: React.PropTypes.string
}

export default MessageOverlay;
