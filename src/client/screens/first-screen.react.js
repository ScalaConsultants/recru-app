import Component from '../components/component.react';
import Chevron from '../components/chevron.react';
import React from 'react';
import './first-screen.styl';

export default class FirstScreen extends Component {
  proceed() {
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
