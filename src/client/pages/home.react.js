import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import FirstScreen from '../screens/first-screen.react';
import SecondScreen from '../screens/second-screen.react';
import ThirdScreen from '../screens/third-screen.react';
import FourthScreen from '../screens/fourth-screen.react';
import FifthScreen from '../screens/fifth-screen.react';
import React from 'react';

export default class Home extends Component {
  render() {
    let style = {
      transform: 'translate3d(0%, 0%, 0)'
    };
    return (
      <DocumentTitle title="Scalac - Best Scala hAkkers">
        <div className="page" style={style}>
          <FirstScreen/>
          <SecondScreen/>
          <ThirdScreen/>
          <FourthScreen/>
          <FifthScreen/>
        </div>
      </DocumentTitle>
    );
  }

}
