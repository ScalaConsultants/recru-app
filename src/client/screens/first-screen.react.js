import Component from '../components/component.react';
import Chevron from '../components/chevron.react';
import React from 'react';
import * as actions from './actions';
import './first-screen.styl';

export default class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.proceed = this.proceed.bind(this);
  }

  proceed() {
    // TODO: if the name is empty do not allow the transition and show the error
    actions.nextScreen();
  }

  render() {
    return (
      <section className="first-screen screen">
        <div className="centering-wrapper">
          <header>
            <h1>Join our team</h1>
            <h2>we are looking for talented passionate people</h2>
            <input placeholder="type your name" tabIndex="-1" type="text"/>
          </header>
        </div>

        <Chevron isAnimated={true} onClick={this.proceed}/>
      </section>
    );
  }

}
