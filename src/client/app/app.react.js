import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
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
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const {location: {pathname}} = this.props;

    return (
      // Pass data-pathname to allow route specific styling.
      <DocumentTitle title="Scalac - Best Scala hAkkers!">
        <div className="page" data-pathname={pathname}>
          {/* Pathname enforces rerender so activeClassName is updated. */}
          <RouterHandler {...this.props} />
        </div>
      </DocumentTitle>
    );
  }

}
