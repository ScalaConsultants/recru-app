import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';

export default class Test extends Component {
  render() {
    return (
      <DocumentTitle title="Test">
        <div className="test-page">
          Test page
        </div>
      </DocumentTitle>
    );
  }

}
