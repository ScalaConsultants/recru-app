import Component from '../components/component.react';
import React from 'react';
import boundScrollMixin from '../mixins/bound-scroll';
import reactMixin from 'react-mixin';
import json from '../data/roles.json';
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
          {json.map((role) => {
            return (
              <li key={role.id} onClick={() => this.proceed(role.id)}>
                <p><strong>{role.name.split(' ')[0]}</strong> {role.name.split(' ')[1]}</p>
                <div>
                  <img alt={`${role.name} path`} src={role.img} />
                  <p>{role.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

reactMixin(ThirdScreen.prototype, boundScrollMixin);

export default ThirdScreen;
