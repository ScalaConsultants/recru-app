import Chevron from '../../components/Chevron.react';
import React from 'react';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./waysInfoScreen.styl');
}

export default class SecondScreen extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired
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
      <section className="second-screen screen">
        <div>
          <h1>
            <span>There are</span>
            <span><strong>several ways</strong></span>
            <span>to the <strong>top</strong></span>
            <button onClick={e => this.proceed(e)} tabIndex="-1">choose your path</button>
            <Chevron isAnimated onClick={e => this.proceed(e)}/>
          </h1>
          <img alt="Scalac Logo" src="assets/img/logo.svg"/>
        </div>
      </section>
    );
  }
}
