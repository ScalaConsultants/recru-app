import './app.styl';
import Component from '../components/component.react';
import React from 'react';
import fetch from 'isomorphic-fetch';
import flux from '../lib/flux';
import store from './store';
import FirstScreen from '../screens/first-screen.react';
import SecondScreen from '../screens/second-screen.react';
import ThirdScreen from '../screens/third-screen.react';
import FourthScreen from '../screens/fourth-screen.react';
import FifthScreen from '../screens/fifth-screen.react';
import MiniMap from '../components/minimap.react';
import Hello from '../components/hello.react';
import ThankYou from '../components/thank-you.react.js';
import classNames from 'classnames';
import movementHandler from '../mixins/movement-handler';

import * as screensActions from '../screens/actions';
import * as candidateActions from '../candidate/actions';

const actions = [screensActions, candidateActions];

@flux(store)
@movementHandler()
export default class App extends Component {

  static propTypes = {
    candidate: React.PropTypes.object.isRequired,
    flux: React.PropTypes.object.isRequired,
    screens: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.createActions();
  }

  createActions() {
    const {flux} = this.props;
    const state = () => flux.state.toObject();

    this.actions = actions.reduce((actions, {create, feature, inject}) => {
      const dispatch = (action, payload) =>
        flux.dispatch(action, payload, {feature});

      const deps = [dispatch, fetch, state];
      const args = inject ? inject(...deps) : deps;
      return {...actions, [feature]: create(...args)};
    }, {});
  }

  getPageOffset() {
    const {currentScreen} = this.props.screens;
    return -(currentScreen * 100);
  }

  getRefNameFor(screen) {
    return this.isCurrent(screen) ? 'currentScreen' : null;
  }

  isCurrent(screen) {
    return this.props.screens.currentScreen === screen;
  }

  handleMoveUp(e) {
    const {screens} = this.actions;
    screens.previousScreen();
  }

  handleMoveDown(e) {
    if (typeof this.refs.currentScreen.proceed === 'function')
      this.refs.currentScreen.proceed();
  }

  render() {
    const props = {...this.props, actions: this.actions};
    const {screens: {currentScreen}, candidate} = props;

    const translate = `translate3d(0%, ${this.getPageOffset()}%, 0)`;
    const listStyle = {
      transform: translate,
      WebkitTransform: translate
    };
    const miniMapAndHelloClassName = classNames({
      '-visible': currentScreen > 0 && !candidate.hasSubmittedForm
    });
    const thankYouClassName = classNames({
      '-visible': candidate.hasSubmittedForm
    });
    const message = `Hello, ${candidate.name}.`;

    return (
      <div className="page">
        {/* Pass only what is needed. The Law of Demeter ftw. */}
        <div className="screen-list" style={listStyle}>
          <FirstScreen {...props} isCurrent={this.isCurrent(0)} ref={this.getRefNameFor(0)}/>
          <SecondScreen {...props} isCurrent={this.isCurrent(1)} ref={this.getRefNameFor(1)}/>
          <ThirdScreen {...props} isCurrent={this.isCurrent(2)} ref={this.getRefNameFor(2)}/>
          <FourthScreen {...props} isCurrent={this.isCurrent(3)} ref={this.getRefNameFor(3)}/>
          <FifthScreen {...props} isCurrent={this.isCurrent(4)} ref={this.getRefNameFor(4)}/>
        </div>
        <Hello {...props} className={miniMapAndHelloClassName} message={message}/>
        <MiniMap {...props} className={miniMapAndHelloClassName}/>
        <ThankYou {...props} className={thankYouClassName}/>
      </div>
    );
  }
}
