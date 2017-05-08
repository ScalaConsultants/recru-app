import Chevron from '../../components/Chevron.react';
import React from 'react';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./WaysInfoScreen.styl');
}

export default class SecondScreen extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.proceed = this.proceed.bind(this);
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  handleMoveDownKeys() {
    this.proceed();
  }

  render() {
    return (
      <section className="ways-info-screen screen">
        <p>There are several ways</p>
        <p>to explore</p>

        <img alt="Scalac Logo"
             src="assets/img/mountains.svg"/>
        <div>
          <button onClick={this.proceed}
                  tabIndex="-1">choose your own</button>
          <Chevron isAnimated
                   onClick={this.proceed}/>
        </div>
      </section>
    );
  }
}
