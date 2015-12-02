import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import {Link} from 'react-router';

export default class NotFound extends Component {

  render() {
    return (
      <div className="notfound-page">
        <Helmet title='Page Not Found'/>
        <h1>Oops, we're sorry.</h1>
        <p>The page you were looking for was not found.</p>
        <Link to="/">Continue to the main page</Link>
      </div>
    );
  }

}
