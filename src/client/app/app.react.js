import './app.styl';
import * as state from '../state';
import Component from '../components/component.react';
import React from 'react';
import FirstScreen from '../screens/first-screen.react';
import SecondScreen from '../screens/second-screen.react';
import ThirdScreen from '../screens/third-screen.react';
import FourthScreen from '../screens/fourth-screen.react';
import FifthScreen from '../screens/fifth-screen.react';
import MiniMap from '../components/minimap.react';
import Hello from '../components/hello.react';
import throttle from 'lodash.throttle';
import classNames from 'classnames';
import {previousScreen} from '../screens/actions';
import {measureRender} from '../console';

// Remember to import all app stores here.
import '../screens/store';
import '../candidate/store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
    this.handleMouseWheel = this.handleMouseWheel.bind(this);
    this.handleMouseWheel = throttle(this.handleMouseWheel, 1000, {
      'leading': true,
      'trailing': false
    });
  }

  getState() {
    return {
      pendingActions: state.pendingActionsCursor(),
      screens: state.screensCursor(),
      candidate: state.candidateCursor()
    };
  }

  getPageOffset() {
    const {screens} = this.state;
    return -(screens.get('currentScreen') * 100);
  }

  handleMouseWheel(e) {
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (delta > 0)
      previousScreen();
  }

  // Why componentWillMount instead of componentDidMount.
  // https://github.com/steida/este/issues/274
  componentWillMount() {
    if (!process.env.IS_BROWSER) return;
    state.appState.on('change', () => {
      measureRender(done => this.setState(this.getState(), done));
    });
  }

  componentDidMount() {
    window.addEventListener('mousewheel', this.handleMouseWheel, false);
    window.addEventListener('DOMMouseScroll', this.handleMouseWheel, false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', this.handleMouseWheel);
    window.removeEventListener('DOMMouseScroll', this.handleMouseWheel);
  }

  render() {
    const translate = `translate3d(0%, ${this.getPageOffset()}%, 0)`;
    const listStyle = {
      transform: translate,
      WebkitTransform: translate
    };
    const miniMapAndHelloClassName = classNames({
      '-visible': this.state.screens.get('currentScreen') > 0
    });
    const message = `Hello, ${this.state.candidate.get('name')}.`;

    return (
      <div className="page">
        <div className="screen-list" style={listStyle}>
          <FirstScreen/>
          <SecondScreen/>
          <ThirdScreen/>
          <FourthScreen candidate={this.state.candidate}/>
          <FifthScreen candidate={this.state.candidate}/>
        </div>
        <Hello className={miniMapAndHelloClassName} message={message}/>
        <MiniMap className={miniMapAndHelloClassName} screens={this.state.screens}/>
      </div>
    );
  }

}

export default App;
