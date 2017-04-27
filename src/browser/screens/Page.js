import Component from 'react-pure-render/component';
import React from 'react';
import FirstScreen from './joinUs/JoinUsScreen';
import SecondScreen from './waysInfo/WaysInfoScreen';
import ThirdScreen from './choosePath/ChoosePathScreen';
import Third2Screen from './backpack/BackpackScreen';
import FourthScreen from './skills/SkillsScreen';
import FifthScreen from './submit/SubmitScreen';
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
        <FirstScreen {...this.props} ref={this.getRefNameFor(0)}/>
        <SecondScreen {...this.props} ref={this.getRefNameFor(1)}/>
        <ThirdScreen {...this.props} ref={this.getRefNameFor(2)}/>
        <Third2Screen {...this.props} ref={this.getRefNameFor(3)}/>
        <FourthScreen {...this.props} ref={this.getRefNameFor(4)}/>
        <FifthScreen {...this.props} ref={this.getRefNameFor(5)}/>
      </div>
    );
  }
}
