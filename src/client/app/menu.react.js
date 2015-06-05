import Component from '../components/component.react';
import React from 'react';
import {Link} from 'react-router';

export default class Menu extends Component {

  render() {
    return (
      <header>
        <h1>
          Welcome!
        </h1>
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="test">Test</Link></li>
        </ul>
      </header>
    );
  }

}
