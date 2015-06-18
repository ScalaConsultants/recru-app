import './app.styl';
import * as state from '../state';
import Component from '../components/component.react';
import React from 'react';
import persistState from './persiststate.react';
import {RouteHandler} from 'react-router';

// Remember to import all app stores here.
import '../screens/store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
  }

  getState() {
    return {
      pendingActions: state.pendingActionsCursor(),
      screens: state.screensCursor()
    };
  }

  // https://github.com/steida/este/issues/274
  componentWillMount() {
    if (!process.env.IS_BROWSER) return;
    state.state.on('change', () => {
      //if ('production' !== process.env.NODE_ENV)
      //  console.time('app render'); // eslint-disable-line no-console
      this.setState(this.getState(), () => {
        //if ('production' !== process.env.NODE_ENV)
        //  console.timeEnd('app render'); // eslint-disable-line no-console
      });
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

App = persistState(App);

export default App;
