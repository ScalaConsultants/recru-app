import React from 'react';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./CompassItem.styl');
}

const CompassItem = (props, {data = {}}) => {
  const item = props.data;
  return (
    <div className="compass-container">
      <img src={item.img} />
      <p>{item.title}</p>
      <span>{item.subtitle}</span>
    </div>
  );
};

CompassItem.propTypes = {
  data: PropTypes.object
};

export default CompassItem;
