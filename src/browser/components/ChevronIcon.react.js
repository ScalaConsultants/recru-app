import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

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
      <i className={arrowColor} />
    </div>
  );
};

ChevronIcon.propTypes = {
  color: PropTypes.string,
  isAnimated: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ChevronIcon;
