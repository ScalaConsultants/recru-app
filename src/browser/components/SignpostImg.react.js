import Component from 'react-pure-render/component';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./SignpostImg.styl');
}

export default class SignpostImg extends Component {
    render() {
      return (
          <div className="screen-img2">
              <a href="https://scalac.io/" target="_blank">
                 <img alt='Signpist to Scalac img' src="../../../assets/img/recruapp_znak_1.png" />
                 {/*<img alt='Signpist to Scalac img' src="../../../assets/img/recruapp_wskaznik_2.png" />*/}
              </a>
          </div>
        );
    }
}
