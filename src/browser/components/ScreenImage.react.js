import React from 'react';

if (process.env.IS_BROWSER) {
  require('./ScreenImage.styl');
}

const ScreenImage = props => {
  return (
    <div className="screen-image">
      { props.data && <img src={props.data.img} /> }
    </div>
  );
};

ScreenImage.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default ScreenImage;
