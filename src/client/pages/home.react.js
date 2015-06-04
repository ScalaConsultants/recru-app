import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Home">
        <div className="home-page">

        </div>
      </DocumentTitle>
    );
  }

}
