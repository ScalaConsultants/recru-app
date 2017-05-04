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
      <section className="second-screen screen">
        <div>
          <h1>
            <span>There are</span>
            <span><strong>several ways</strong></span>
            <span>to the <strong>top</strong></span>

            <button onClick={this.proceed}
                    tabIndex="-1">choose your path</button>

            <Chevron isAnimated
                     onClick={this.proceed}/>
          </h1>
          <img alt="Scalac Logo"
               src="assets/img/logo.svg"/>
        </div>
      </section>
    );
  }
}
