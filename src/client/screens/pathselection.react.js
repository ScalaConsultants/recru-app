import Component from '../components/component.react';
import React from 'react';

export default class PathSelection extends Component {
  render() {
    return (
      <section className="path-selection-screen screen">
        <header>Choose your path</header>
        <ul>
          <li>
            <span><em>Backend</em> Climber</span>
            <img alt="Backend Climber path" src="" />
          </li>
          <li>
            <span><em>Frontend</em> Explorer</span>
            <img alt="Frontend Explorer path" src="" />
          </li>
          <li>
            <span><em>Mobile</em> Hiker</span>
            <img alt="Mobile Hiker path" src="" />
          </li>
          <li>
            <span><em>devOps</em> Sherpa</span>
            <img alt="devOps Sherpa path" src="" />
          </li>
        </ul>
      </section>
    );
  }

}
