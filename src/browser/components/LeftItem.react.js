import Component from 'react-pure-render/component';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./LeftItem.styl');
}

export default class LeftItem extends Component {
  render() {
    return (
      <div className="left">
        <img src="../../../assets/img/plecak.svg" />
      </div>
    );
  }
}
