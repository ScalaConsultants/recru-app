import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import FirstScreen from '../screens/first-screen.react';
import SecondScreen from '../screens/second-screen.react';
import ThirdScreen from '../screens/third-screen.react';
import FourthScreen from '../screens/fourth-screen.react';
import FifthScreen from '../screens/fifth-screen.react';
import MiniMap from '../components/minimap.react';
import Hello from '../components/hello.react';
import React from 'react';
import classNames from 'classnames';
import immutable from 'immutable';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  getPageOffset() {
    const {screens} = this.props;
    return -(screens.get('currentScreen') * 100);
  }

  render() {
    const translate = `translate3d(0%, ${this.getPageOffset()}%, 0)`;
    const listStyle = {
      transform: translate,
      '-webkit-transform': translate
    };
    const miniMapAndHelloClassName = classNames({
      '-visible': this.props.screens.get('currentScreen') > 0
    });
    const message = `Hello, ${this.props.candidate.get('name')}.`;

    return (
      <DocumentTitle title="Scalac - Best Scala hAkkers">
        <div className="page">
          <div className="screen-list" style={listStyle}>
            <FirstScreen/>
            <SecondScreen/>
            <ThirdScreen/>
            <FourthScreen/>
            <FifthScreen/>
          </div>
          <Hello className={miniMapAndHelloClassName} message={message}/>
          <MiniMap className={miniMapAndHelloClassName} screens={this.props.screens}/>
        </div>
      </DocumentTitle>
    );
  }

}

Home.propTypes = {
  candidate: React.PropTypes.instanceOf(immutable.Map).isRequired,
  screens: React.PropTypes.instanceOf(immutable.Map).isRequired
};

export default Home;
