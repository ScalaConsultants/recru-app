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
    this.state = this.getDefaultState();
    this.proceed = this.proceed.bind(this);
    this.handleChooseRole = this.handleChooseRole.bind(this);
  }

  getDefaultState() {
    return {
      role: null
    };
  }

  proceed() {
    if (!this.state.role)
      return;

    saveRole(this.state.role);
    nextScreen();
  }

  handleChooseRole(role) {
    this.setState({role: role}, () => this.proceed());
  }

  render() {
    return (
      <section className="third-screen screen">
        <ul>
          {json.map((role) => {
            return (
              <li key={role.id} onClick={() => this.handleChooseRole(role)}>
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
