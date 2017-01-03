import Component from 'react-pure-render/component';
import Chevron from '../components/Chevron.react';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./Second.styl');
}

export default class SecondScreen extends Component {
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
