import Component from '../components/component.react';
import React from 'react';
import * as actions from './actions';
import './third-screen.styl';

export default class ThirdScreen extends Component {
  render() {
    return (
      <section className="third-screen screen">
        <ul>
          <li onClick={actions.nextScreen}>
            <p><strong>Backend</strong> Climber</p>
            <img alt="Backend Climber path" src="assets/img/climber.JPG" />
          </li>
          <li onClick={actions.nextScreen}>
            <p><strong>Frontend</strong> Explorer</p>
            <img alt="Frontend Explorer path" src="assets/img/climber.JPG" />
          </li>
          <li onClick={actions.nextScreen}>
            <p><strong>Mobile</strong> Hiker</p>
            <img alt="Mobile Hiker path" src="assets/img/climber.JPG" />
          </li>
          <li onClick={actions.nextScreen}>
            <p><strong>devOps</strong> Sherpa</p>
            <img alt="devOps Sherpa path" src="assets/img/climber.JPG" />
          </li>
        </ul>
      </section>
    );
  }

}
