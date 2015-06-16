import Component from '../components/component.react';
import React from 'react';
import './initial.styl';

export default class Initial extends Component {
  render() {
    return (
      <section className="initial-screen screen">
        <header>
          <span>There are</span>
          <span><strong>several ways</strong></span>
          <span>to the <strong>top</strong></span>
        </header>

        <div className="controls-box">
          <input placeholder="type your name" type="text" />
          <button>go</button>
        </div>

        <img src="assets/img/logo.svg" />
      </section>
    );
  }

}
