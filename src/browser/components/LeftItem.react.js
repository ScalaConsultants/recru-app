import React from 'react';

if (process.env.IS_BROWSER) {
  require('./LeftItem.styl');
}

export default function LeftItem(props) {
  return (
    <div className="left">
      { props.data && <img src={props.data.img} /> }
    </div>
  );
}
