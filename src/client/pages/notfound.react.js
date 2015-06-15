import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';

class NotFound extends Component {

  render() {
    return (
      <DocumentTitle title="Page Not Found">
        <div className="notfound-page page">
          <h1>This page isn't available</h1>
          <p>The link may be broken, or the page may have been removed.</p>
          <Link to="home">Continue here please.</Link>
        </div>
      </DocumentTitle>
    );
  }

}

export default NotFound;
