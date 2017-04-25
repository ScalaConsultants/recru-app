import Component from 'react-pure-render/component';
import React from 'react';
import FirstScreen from '../screens/First.react';
import SecondScreen from '../screens/Second.react';
import ThirdScreen from '../screens/Third.react';
import Third2Screen from './Third2.react';
import FourthScreen from './Fourth.react';
import FifthScreen from './Fifth.react';
import movementHandler from '../lib/movementHandler';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

@movementHandler
export default class Screens extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    candidate: PropTypes.object.isRequired,
    screens: PropTypes.object.isRequired
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

  handleMoveDownKeys(e) {
    if (typeof this.refs.currentScreen.handleMoveDownKeys === 'function') {
      this.refs.currentScreen.handleMoveDownKeys();
    }
  }

  handleMoveUp(e) {
    if (typeof this.refs.currentScreen.handleMoveUp === 'function') {
      this.refs.currentScreen.handleMoveUp();
    }

    const {actions: {previousScreen}} = this.props;
    previousScreen();
  }

  handleMoveDown(e) {
    if (typeof this.refs.currentScreen.proceed === 'function')
      this.refs.currentScreen.proceed();
  }

  render() {
    const translate = `translate3d(0%, ${this.getPageOffset()}%, 0)`;
    const listStyle = {
      transform: translate,
      WebkitTransform: translate
    };

    return (
      <div className="screen-list" style={listStyle}>
        <Helmet title='Join Us'/>
        <FirstScreen {...this.props} isCurrent={this.isCurrent(0)} ref={this.getRefNameFor(0)}/>
        <SecondScreen {...this.props} isCurrent={this.isCurrent(1)} ref={this.getRefNameFor(1)}/>
        <ThirdScreen {...this.props} isCurrent={this.isCurrent(2)} ref={this.getRefNameFor(2)}/>
        <Third2Screen {...this.props} isCurrent={this.isCurrent(3)} ref={this.getRefNameFor(3)}/>
        <FourthScreen {...this.props} isCurrent={this.isCurrent(4)} ref={this.getRefNameFor(4)}/>
        <FifthScreen {...this.props} isCurrent={this.isCurrent(5)} ref={this.getRefNameFor(5)}/>
      </div>
    );
  }
}
