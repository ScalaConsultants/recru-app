import Component from '../components/component.react';
import React from 'react';
import './second-screen.styl';

export default class SecondScreen extends Component {
  render() {
    return (
      <section className="second-screen screen">
        <div>
          <span>There are</span>
          <span><strong>several ways</strong></span>
          <span>to the <strong>top</strong></span>
          <button tabIndex="-1">Down</button>
          <img src="assets/img/logo.svg" />
        </div>
      </section>
    );
  }

}
