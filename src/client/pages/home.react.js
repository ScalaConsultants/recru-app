import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import InitialScreen from '../screens/initial.react';
import PathSelectionScreen from '../screens/pathselection.react';
import ExperienceAssignmentScreen from '../screens/experienceassignment.react';
import UploadResumeScreen from '../screens/uploadresume.react';
import React from 'react';
import './page.styl';

export default class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Scalac - Best Scala hAkkers">
        <div className="home-page page">
          <InitialScreen />
          <PathSelectionScreen />
          <ExperienceAssignmentScreen />
          <UploadResumeScreen />
        </div>
      </DocumentTitle>
    );
  }

}
