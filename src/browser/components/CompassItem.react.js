import Component from 'react-pure-render/component';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./CompassItem.styl');
}

export default function CompassItem(props) {
  const data = props.data;
  return (
    <div className="item">
      <img src={data.img} />
      <p>{data.title}</p>
      <span>{data.subtitle}</span>
    </div>
  );
}

CompassItem.propTypes = {
  data: React.PropTypes.object
}

CompassItem.defaultProps = {
  data: {}
};