import './app.styl';
import * as state from '../state';
import Component from '../components/component.react';
import React from 'react';
import {RouteHandler} from 'react-router';
import {measureRender} from '../console';

// Remember to import all app stores here.
import '../screens/store';
import '../candidate/store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
  }

  getState() {
    return {
      pendingActions: state.pendingActionsCursor(),
      screens: state.screensCursor(),
      candidate: state.candidateCursor()
    };
  }

  // Why componentWillMount instead of componentDidMount.
  // https://github.com/steida/este/issues/274
  componentWillMount() {
    if (!process.env.IS_BROWSER) return;
    state.appState.on('change', () => {
      measureRender(done => this.setState(this.getState(), done));
    });
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
