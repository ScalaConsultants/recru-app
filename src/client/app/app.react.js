import * as appState from '../state';
import Component from '../components/component.react';
import React from 'react';
import exposeRouter from '../components/exposerouter.react';
import {RouteHandler} from 'react-router';

// Load stores, but don't import anything. Read from global app state instead.
// Remember: Anytime you create a new store, you have to load it here.
import '../app/store';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('./app.styl');

class App extends Component {

  constructor(props) {
    super(props);
    // Set initial state.
    this.state = this.getState();
  }

  getState() {
    return {
      app: appState.appCursor(),
      pendingActions: appState.pendingActionsCursor()
    };
  }

  // This method is not called on the server.
  componentDidMount() {
    // fastclick must be required here because there is no DOM in Node.js.
    // Remember, mocking DOM in Node.js is an anti-pattern, because it can
    // confuse isomorphic libraries. TODO: Wait for iOS fix, then remove it.
    // http://developer.telerik.com/featured/300-ms-click-delay-ios-8/
    require('fastclick').attach(document.body);

    document.addEventListener('keypress', this.onDocumentKeypress);

    appState.state.on('change', () => {
      console.time('app render'); // eslint-disable-line no-console
      this.setState(this.getState(), () => {
        console.timeEnd('app render'); // eslint-disable-line no-console
      });
    });
  }

  onDocumentKeypress(e) {
    // Press ctrl+shift+s to save app state, and ctrl+shift+l to load.
    if (!e.ctrlKey || !e.shiftKey) return;
    const state = appState.state;
    switch (e.keyCode) {
      case 19:
        window._appState = state.save();
        window._appStateString = JSON.stringify(window._appState);
        /*eslint-disable no-console */
        console.log('App state saved.');
        console.log('To report error, type copy(_appStateString) and press enter.');
        console.log('To debug app state, type _appState and press enter.');
        /*eslint-enable */
        break;
      case 12:
        const stateStr = window.prompt('Paste the serialized state into the input'); // eslint-disable-line no-alert
        const newState = JSON.parse(stateStr);
        if (!newState) return;
        state.load(newState);
        break;
    }
  }

  render() {
    return (
      <div className="page">
        <RouteHandler {...this.state} />
      </div>
    );
  }

}

App.propTypes = {
  router: React.PropTypes.func
};

export default exposeRouter(App);
