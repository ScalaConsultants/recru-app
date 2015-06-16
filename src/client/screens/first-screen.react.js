import Component from '../components/component.react';
import React from 'react';
import './first-screen.styl';

export default class FirstScreen extends Component {
  render() {
    return (
      <section className="first-screen screen">
        <h1>Join our team</h1>
        <h2>we are looking for talented passionate people</h2>
        <input placeholder="type your name" type="text" />
        <button>Down</button>
      </section>
    );
  }

}
