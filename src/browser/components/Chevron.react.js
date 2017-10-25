import Component from 'react-pure-render/component';
import classNames from 'classnames';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./Chevron.styl');
}

export default function Chevron(props) {
  const arrowColor = classNames({
    '-red': props.color === 'red',
  });

  const className = classNames('chevron', {
    '-animated': !!props.isAnimated,
    '-clickable': !!props.onClick
  });

  return (
    <div className={className} onClick={props.onClick}>
      <i className={arrowColor}></i>
    </div>
  );
}

Chevron.propTypes = {
  color: React.PropTypes.string,
  isAnimated: React.PropTypes.bool,
  onClick: React.PropTypes.func,
}

Chevron.defaultProps = {
  isAnimated: true
}