import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';

export default class NotFound extends Component {

  render() {
    return (
      <DocumentTitle title='Page Not Found'>
        <div className="notfound-page">
          <h1>Oops, we're sorry.</h1>
          <p>The page you were looking for was not found.</p>
          <Link to="/">Continue to the main page</Link>
        </div>
      </DocumentTitle>
    );
  }

}
