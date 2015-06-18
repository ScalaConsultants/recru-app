import Component from '../components/component.react';
import React from 'react';
import {saveRole} from '../candidate/actions';
import {nextScreen} from './actions';
import './third-screen.styl';

export default class ThirdScreen extends Component {
  constructor(props) {
    super(props);
    this.proceed = this.proceed.bind(this);
  }

  proceed(role) {
    saveRole(role);
    nextScreen();
  }

  render() {
    return (
      <section className="third-screen screen">
        <ul>
          <li onClick={() => this.proceed(0)}>
            <p><strong>Backend</strong> Climber</p>
            <img alt="Backend Climber path" src="assets/img/climber.jpg" />
          </li>
          <li onClick={() => this.proceed(1)}>
            <p><strong>Frontend</strong> Explorer</p>
            <img alt="Frontend Explorer path" src="assets/img/explorer.jpg" />
          </li>
          <li onClick={() => this.proceed(2)}>
            <p><strong>Mobile</strong> Hiker</p>
            <img alt="Mobile Hiker path" src="assets/img/hiker.jpg" />
          </li>
          <li onClick={() => this.proceed(3)}>
            <p><strong>DevOps</strong> Sherpa</p>
            <img alt="devOps Sherpa path" src="assets/img/sherpa.jpg" />
          </li>
        </ul>
      </section>
    );
  }

}
