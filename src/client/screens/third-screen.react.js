import Component from '../components/component.react';
import React from 'react';
import boundScrollMixin from '../mixins/bound-scroll';
import reactMixin from 'react-mixin';
import {saveRole} from '../candidate/actions';
import {nextScreen} from './actions';
import './third-screen.styl';

class ThirdScreen extends Component {
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
            <p><strong>Clojure</strong> Explorer</p>
            <div>
              <img alt="Clojure Explorer path" src="assets/img/explorer.jpg" />
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
            <p><strong>Frontend</strong> Observer</p>
            <div>
              <img alt="frontend observer path" src="assets/img/observer.jpg" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis mi ipsum, at rutrum tellus egestas eget. Curabitur dolor sem, tincidunt pulvinar vestibulum vel, luctus hendrerit velit. Donec lobortis varius facilisis.</p>
            </div>
          </li>
        </ul>
      </section>
    );
  }
}

reactMixin(ThirdScreen.prototype, boundScrollMixin);

export default ThirdScreen;
