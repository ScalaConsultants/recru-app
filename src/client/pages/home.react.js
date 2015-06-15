import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import InitialScreen from '../screens/initial.react';
import PathSelectionScreen from '../screens/pathselection.react';
import React from 'react';
import './page.styl';

export default class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Scalac - Best Scala hAkkers">
        <div className="home-page page">
          <InitialScreen />
          <PathSelectionScreen />

          <section className="experience-assignment-screen">
            <header>Pack your bag</header>
            <ul>
              <li>
                <img alt="Angular" src=""/>
                <div>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </li>
            </ul>
          </section>

          <section className="upload-resume-screen">
            <header>One more thing...</header>
          </section>

          <section className="thank-you-screen">
            <header>Thank you, we'll contact you ASAP.</header>
          </section>
        </div>
      </DocumentTitle>
    );
  }

}
