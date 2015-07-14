import './app.styl';
import Component from '../components/component.react';
import React from 'react';
import FirstScreen from '../screens/first-screen.react';
import SecondScreen from '../screens/second-screen.react';
import ThirdScreen from '../screens/third-screen.react';
import FourthScreen from '../screens/fourth-screen.react';
import FifthScreen from '../screens/fifth-screen.react';
import MiniMap from '../components/minimap.react';
import Hello from '../components/hello.react';
import ThankYou from '../components/thank-you.react.js';
import classNames from 'classnames';
import reactMixin from 'react-mixin';
import movementHandlerMixin from '../mixins/movement-handler';
import {appState} from '../state';
import {previousScreen} from '../screens/actions';
import {measureRender} from '../console';

// All stores must be imported here.
import '../screens/store';
import '../candidate/store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
    this.getPageOffset = this.getPageOffset.bind(this);
    this.getRefNameFor = this.getRefNameFor.bind(this);
  }

  getState() {
    return appState.get().merge({
      // nothing else at the moment
    }).toObject();
  }

  getPageOffset() {
    const {screens} = this.state;
    return -(screens.get('currentScreen') * 100);
  }

  getRefNameFor(screen) {
    return this.isCurrent(screen) ? 'currentScreen' : null;
  }

  isCurrent(screen) {
    return this.state.screens.get('currentScreen') === screen;
  }

  handleMoveUp(e) {
    previousScreen();
  }

  handleMoveDown(e) {
    if (typeof this.refs.currentScreen.proceed === 'function')
      this.refs.currentScreen.proceed();
  }

  // Why componentWillMount instead of componentDidMount.
  // https://github.com/este/este/issues/274
  componentWillMount() {
    if (!process.env.IS_BROWSER) return;
    appState.on('change', () => {
      measureRender(done => this.setState(this.getState(), done));
    });
  }

  render() {
    const translate = `translate3d(0%, ${this.getPageOffset()}%, 0)`;
    const listStyle = {
      transform: translate,
      WebkitTransform: translate
    };
    const miniMapAndHelloClassName = classNames({
      '-visible': this.state.screens.get('currentScreen') > 0 && !this.state.candidate.get('hasSubmittedForm')
    });
    const thankYouClassName = classNames({
      '-visible': this.state.candidate.get('hasSubmittedForm')
    });
    const message = `Hello, ${this.state.candidate.get('name')}.`;

    return (
      <div className="page">
        <div className="screen-list" style={listStyle}>
          <FirstScreen isCurrent={this.isCurrent(0)} ref={this.getRefNameFor(0)}/>
          <SecondScreen isCurrent={this.isCurrent(1)} ref={this.getRefNameFor(1)}/>
          <ThirdScreen isCurrent={this.isCurrent(2)} ref={this.getRefNameFor(2)}/>
          <FourthScreen {...this.state} isCurrent={this.isCurrent(3)} ref={this.getRefNameFor(3)}/>
          <FifthScreen {...this.state} isCurrent={this.isCurrent(4)} ref={this.getRefNameFor(4)}/>
        </div>
        <Hello className={miniMapAndHelloClassName} message={message}/>
        <MiniMap className={miniMapAndHelloClassName} screens={this.state.screens}/>
        <ThankYou className={thankYouClassName}/>
      </div>
    );
  }
}

reactMixin(App.prototype, movementHandlerMixin);

export default App;
