import Component from '../components/component.react';
import Chevron from '../components/chevron.react';
import React from 'react';
import classNames from 'classnames';
import {nextScreen} from './actions';
import {saveName} from '../candidate/actions';
import './first-screen.styl';

export default class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.proceed = this.proceed.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getDefaultState() {
    return {error: null};
  }

  proceed() {
    const name = this.refs.nameInput.getDOMNode().value.trim();

    if (!name) {
      this.setState({error: 'Name is a required field.'});
      return;
    }

    this.setState(this.getDefaultState());
    saveName(name);
    nextScreen();
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.refs.nameInput.getDOMNode().blur();
      this.proceed();
    }
  }

  render() {
    const formControlClassName = classNames('form-control', {
      '-error': !!this.state.error
    });

    return (
      <section className="first-screen screen">
        <div className="centering-wrapper">
          <header>
            <h1>Join our team</h1>
            <h2>we are looking for talented passionate people</h2>
            <div className={formControlClassName}>
              <input autoComplete="off" onKeyDown={this.handleKeyDown} placeholder="type your name" ref="nameInput" tabIndex="-1" type="text"/>
              <span>{this.state.error}</span>
            </div>
          </header>
        </div>

        <Chevron isAnimated={true} onClick={this.proceed}/>
      </section>
    );
  }

}
