import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import Component from 'react-pure-render/component';

import FirstScreen from '../screens/First.react';
import SecondScreen from '../screens/Second.react';
import Roles from '../screens/Roles.react';
import Skills from '../screens/Skills.react';
import Submit from '../screens/Submit.react';
import Position from '../screens/Position.react';
import Compass from '../screens/Compass.react';
import Equipment from '../screens/Equipment.react';
import Check from '../screens/Check.react';
import Experience from '../screens/Experience.react';
import Rodo from '../screens/Rodo.react';
import movementHandler from '../lib/movementHandler';

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

  handleMoveUp(e) {
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
        <Roles {...this.props} isCurrent={this.isCurrent(2)} ref={this.getRefNameFor(2)}/>
        <Position {...this.props} isCurrent={this.isCurrent(3)} ref={this.getRefNameFor(3)}/>
        <Compass {...this.props} isCurrent={this.isCurrent(4)} ref={this.getRefNameFor(4)}/>
        <Equipment {...this.props} isCurrent={this.isCurrent(5)} ref={this.getRefNameFor(5)}/>
        <Skills {...this.props} isCurrent={this.isCurrent(6)} ref={this.getRefNameFor(6)}/>
        <Check {...this.props} isCurrent={this.isCurrent(7)} ref={this.getRefNameFor(7)}/>
        <Experience {...this.props} isCurrent={this.isCurrent(8)} ref={this.getRefNameFor(8)}/>
        <Rodo {...this.props} isCurrent={this.isCurrent(9)} ref={this.getRefNameFor(9)}/>
        <Submit {...this.props} isCurrent={this.isCurrent(10)} ref={this.getRefNameFor(10)}/>
      </div>
    );
  }
}
