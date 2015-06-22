import './app.styl';
import * as state from '../state';
import Component from '../components/component.react';
import React from 'react';
import throttle from 'lodash.throttle';
import {previousScreen} from '../screens/actions';
import {RouteHandler} from 'react-router';
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

  componentDidUnmount() {
    window.removeEventListener('mousewheel', this.handleMouseWheel);
    window.removeEventListener('DOMMouseScroll', this.handleMouseWheel);
  }

  render() {
    return (
      <div className="page">
        <RouteHandler {...this.state}/>
      </div>
    );
  }

}

export default App;
