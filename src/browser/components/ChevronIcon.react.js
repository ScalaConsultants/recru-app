import classNames from 'classnames';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./ChevronIcon.styl');
}

const ChevronIcon = (props, {isAnimated = true}) => {
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
};

ChevronIcon.propTypes = {
  color: React.PropTypes.string,
  isAnimated: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default ChevronIcon;
