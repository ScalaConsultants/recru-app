import Component from '../components/component.react';
import React from 'react';
import './fifth-screen.styl';

export default class FifthScreen extends Component {
  render() {
    return (
      <section className="fifth-screen screen">
        <header>One more thing...</header>
        <div class="drop-area" id="drop">
          <span>drop your resume</span>
        </div>
      </section>
    );
  }

}
