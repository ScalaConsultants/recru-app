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
            <div>
              <img alt="Backend Climber path" src="assets/img/climber.jpg" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis mi ipsum, at rutrum tellus egestas eget. Curabitur dolor sem, tincidunt pulvinar vestibulum vel, luctus hendrerit velit. Donec lobortis varius facilisis.</p>
            </div>
          </li>
          <li onClick={() => this.proceed(1)}>
            <p><strong>Frontend</strong> Explorer</p>
            <div>
              <img alt="Frontend Explorer path" src="assets/img/explorer.jpg" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis mi ipsum, at rutrum tellus egestas eget. Curabitur dolor sem, tincidunt pulvinar vestibulum vel, luctus hendrerit velit. Donec lobortis varius facilisis.</p>
            </div>
          </li>
          <li onClick={() => this.proceed(2)}>
            <p><strong>Mobile</strong> Hiker</p>
            <div>
              <img alt="Mobile Hiker path" src="assets/img/hiker.jpg" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis mi ipsum, at rutrum tellus egestas eget. Curabitur dolor sem, tincidunt pulvinar vestibulum vel, luctus hendrerit velit. Donec lobortis varius facilisis.</p>
            </div>
          </li>
          <li onClick={() => this.proceed(3)}>
            <p><strong>DevOps</strong> Sherpa</p>
            <div>
              <img alt="devOps Sherpa path" src="assets/img/sherpa.jpg" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis mi ipsum, at rutrum tellus egestas eget. Curabitur dolor sem, tincidunt pulvinar vestibulum vel, luctus hendrerit velit. Donec lobortis varius facilisis.</p>
            </div>
          </li>
        </ul>
      </section>
    );
  }

}
