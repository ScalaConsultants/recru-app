import Component from '../components/component.react';
import Chevron from '../components/chevron.react';
import React from 'react';
import * as actions from './actions';
import './second-screen.styl';

export default class SecondScreen extends Component {
  render() {
    return (
      <section className="second-screen screen">
        <div>
          <img src="assets/img/logo.svg" />
          <h1>
            <span>There are</span>
            <span><strong>several ways</strong></span>
            <span>to the <strong>top</strong></span>
            <button onClick={actions.nextScreen} tabIndex="-1">choose your path</button>
            <Chevron isAnimated={true} onClick={actions.nextScreen}/>
          </h1>
        </div>
      </section>
    );
  }

}
