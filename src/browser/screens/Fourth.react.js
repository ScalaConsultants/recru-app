import Component from 'react-pure-render/component';
import Chevron from '../components/Chevron.react';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./Fourth.styl');
  // require('velocity-animate');
  // require('velocity-animate/velocity.ui');
}

export default class FourthScreen extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  handleEnterKey() {
    this.proceed();
  }

  render() {
    return (
        <section className="fourth-screen screen">
          <div className="screen-title">
            <h1>
              <span><strong>Pack Your bag</strong></span>
            </h1>
          </div>
          <div className="screen-img">
            <img alt='Scalac Logo' src="assets/img/plecak_1.png"/>
          </div>
          <div className="screen-list">
            <ul>
              <li>computer</li>
              <li>headphones</li>
              <li>pens</li>
              <li>notebook</li>
              <li>calendar</li>
              <li>hoodie</li>
              <li>t-shirt</li>
              <li>socks</li>
            </ul>
            <ul>
              <li>team working</li>
              <li>best integration ever</li>
              <li>friendliness</li>
              <li>professional cooperation</li>
              <li>proactive people</li>
              <li>equality</li>
            </ul>
          </div>

          <Chevron isAnimated onClick={e => this.proceed(e)}/>
        </section>
    );
  }
}
