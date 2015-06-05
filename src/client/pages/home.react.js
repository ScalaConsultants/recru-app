import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';

export default class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Home">
        <div className="home-page">
          Home
        </div>
      </DocumentTitle>
    );
  }

}
