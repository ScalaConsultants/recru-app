import './app.styl';
import Component from '../components/component.react';
import React from 'react';
import createActions from './createactions';
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

@flux(store)
@createActions
@movementHandler
export default class App extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired,
    screens: React.PropTypes.object.isRequired
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
    const {actions: {screens}} = this.props;
    screens.previousScreen();
  }

  handleMoveDown(e) {
    if (typeof this.refs.currentScreen.proceed === 'function')
      this.refs.currentScreen.proceed();
  }

  render() {
    const {screens: {currentScreen}, candidate} = this.props;

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
          <FirstScreen {...this.props} isCurrent={this.isCurrent(0)} ref={this.getRefNameFor(0)}/>
          <SecondScreen {...this.props} isCurrent={this.isCurrent(1)} ref={this.getRefNameFor(1)}/>
          <ThirdScreen {...this.props} isCurrent={this.isCurrent(2)} ref={this.getRefNameFor(2)}/>
          <FourthScreen {...this.props} isCurrent={this.isCurrent(3)} ref={this.getRefNameFor(3)}/>
          <FifthScreen {...this.props} isCurrent={this.isCurrent(4)} ref={this.getRefNameFor(4)}/>
        </div>
        <Hello {...this.props} className={miniMapAndHelloClassName} message={message}/>
        <MiniMap {...this.props} className={miniMapAndHelloClassName}/>
        <ThankYou {...this.props} className={thankYouClassName}/>
      </div>
    );
  }
}
