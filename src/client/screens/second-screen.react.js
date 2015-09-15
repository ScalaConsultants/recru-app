import Component from '../components/component.react';
import Chevron from '../components/chevron.react';
import React from 'react';
import './second-screen.styl';

export default class SecondScreen extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired
  }

  proceed() {
    const {actions: {screens}} = this.props;
    screens.nextScreen();
  }

  render() {
    return (
      <section className="second-screen screen">
        <div>
          <h1>
            <span>There are</span>
            <span><strong>several ways</strong></span>
            <span>to the <strong>top</strong></span>
            <button onClick={::this.proceed} tabIndex="-1">choose your path</button>
            <Chevron isAnimated onClick={::this.proceed}/>
          </h1>
          <img alt='Scalac Logo' src="assets/img/logo.svg"/>
        </div>
      </section>
    );
  }
}
