import Helmet from 'react-helmet';
import React from 'react';
import {Link} from 'react-router';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <Helmet title='Page Not Found'/>
      <h1>Oops, we're sorry.</h1>
      <p>The page you were looking for was not found.</p>
      <Link to="/">Continue to the main page</Link>
    </div>
  );
}
