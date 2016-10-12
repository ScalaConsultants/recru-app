import Component from 'react-pure-render/component';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./BagImg.styl');
}

export default class BagImg extends Component {
    render() {
      return (
          <div className="screen-img">
              <img alt='Your Scalac Bag img' src="../../../assets/img/plecak_1.png" />
          </div>
        );
    }
}
