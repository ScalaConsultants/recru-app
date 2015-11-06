import classNames from 'classnames';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import FirstScreen from '../screens/First.react';
import SecondScreen from '../screens/Second.react';
import ThirdScreen from '../screens/Third.react';
import FourthScreen from '../screens/Fourth.react';
import FifthScreen from '../screens/Fifth.react';
import MiniMap from '../components/Minimap.react';
import Hello from '../components/Hello.react';
import ThankYou from '../components/ThankYou.react.js';
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
      <div className="screen-list" style={listStyle}>
        <FirstScreen {...this.props} isCurrent={this.isCurrent(0)} ref={this.getRefNameFor(0)}/>
        <SecondScreen {...this.props} isCurrent={this.isCurrent(1)} ref={this.getRefNameFor(1)}/>
        <ThirdScreen {...this.props} isCurrent={this.isCurrent(2)} ref={this.getRefNameFor(2)}/>
        <FourthScreen {...this.props} isCurrent={this.isCurrent(3)} ref={this.getRefNameFor(3)}/>
        <FifthScreen {...this.props} isCurrent={this.isCurrent(4)} ref={this.getRefNameFor(4)}/>

        <Hello {...this.props} className={miniMapAndHelloClassName} message={message}/>
        <MiniMap {...this.props} className={miniMapAndHelloClassName}/>
        <ThankYou {...this.props} className={thankYouClassName}/>
      </div>
    );
  }
}
