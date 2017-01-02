import Component from 'react-pure-render/component';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./BagImg.styl');
}

export default class BagImg extends Component {
  render() {
    return (
      <div className="bag-img">
        <img alt="Your Scalac Bag" id="bag-img" src="../../../assets/img/packYourBag/bag.png"/>
      </div>
    );
  }
}
