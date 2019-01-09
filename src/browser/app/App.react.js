import classNames from 'classnames';
import Component from 'react-pure-render/component';
import MiniMap from '../components/Minimap.react';
import Hello from '../components/Hello.react';
import MessageOverlay from '../components/MessageOverlay.react.js';
import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';
import RouterHandler from '../../common/components/RouterHandler.react';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import {connect} from 'react-redux';

if (process.env.IS_BROWSER)
  require('./App.styl');
require('./Large.styl');

// // logRenderTime is useful for app with huge UI to check render performance.
// import logRenderTime from '../lib/logRenderTime';

@connect(mapStateToProps, mapDispatchToProps)
// @logRenderTime
class App extends Component {

  static propTypes = {
    candidate: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    screens: PropTypes.object.isRequired
  }

  render() {
    const {location: {pathname}} = this.props;
    const {screens: {currentScreen}, candidate} = this.props;

    const miniMapAndHelloClassName = classNames({
      '-visible': currentScreen > 0 && !candidate.hasSubmittedForm
    });
    const messageOverlayClassName = classNames({
      '-visible': candidate.hasSubmittedForm,
      '-error': candidate.hasSubmissionErroredOut
    });
    const messageOverlayTitle = candidate.hasSubmissionErroredOut ? 'Whoops' : 'Thank You';
    const messageOverlayContent = candidate.hasSubmissionErroredOut
      ? 'Something went wrong and we are very sorry about that. Drop us a message at info@scalac.io, thanks!'
      : 'You\'ll hear from us very soon.';

    const message = candidate.name ? `Hello, ${candidate.name}.` : 'Hello!';

    return (
      // Pass data-pathname to allow route specific styling.
      <div className="page" data-pathname={pathname}>
        <Helmet
          meta={[{
            name: 'description',
            content: 'Best Scala hAkkers'
          }]}
          titleTemplate="%s @ Scalac"/>
        {/* Pathname enforces rerender so activeClassName is updated. */}
        <RouterHandler {...this.props} />

        <Hello {...this.props} className={miniMapAndHelloClassName} message={message}/>
        <MiniMap {...this.props} className={miniMapAndHelloClassName}/>
        <MessageOverlay {...this.props} className={messageOverlayClassName} content={messageOverlayContent} title={messageOverlayTitle}/>
      </div>
    );
  }

}

export default App;
