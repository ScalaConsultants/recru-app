import classNames from 'classnames';
import Component from 'react-pure-render/component';
import MiniMap from '../components/Minimap.react';
import Hello from '../components/Hello.react';
import ThankYou from '../components/ThankYou.react.js';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import RouterHandler from '../../common/components/RouterHandler.react';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import {connect} from 'react-redux';

if (process.env.IS_BROWSER)
  require('./App.styl');

// // logRenderTime is useful for app with huge UI to check render performance.
// import logRenderTime from '../lib/logRenderTime';

@connect(mapStateToProps, mapDispatchToProps)
// @logRenderTime
export default class App extends Component {

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
    const thankYouClassName = classNames({
      '-visible': candidate.hasSubmittedForm
    });
    const message = `Hello, ${candidate.name}.`;

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
        <ThankYou {...this.props} className={thankYouClassName}/>
      </div>
    );
  }

}
