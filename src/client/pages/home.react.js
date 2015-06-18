import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import FirstScreen from '../screens/first-screen.react';
import SecondScreen from '../screens/second-screen.react';
import ThirdScreen from '../screens/third-screen.react';
import FourthScreen from '../screens/fourth-screen.react';
import FifthScreen from '../screens/fifth-screen.react';
import MiniMap from '../components/minimap.react';
import React from 'react';
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
    const style = {
      transform: `translate3d(0%, ${this.getPageOffset()}%, 0)`
    };

    return (
      <DocumentTitle title="Scalac - Best Scala hAkkers">
        <div className="page" style={style}>
          <FirstScreen/>
          <SecondScreen/>
          <ThirdScreen/>
          <FourthScreen/>
          <FifthScreen/>
          <MiniMap/>
        </div>
      </DocumentTitle>
    );
  }

}

Home.propTypes = {
  screens: React.PropTypes.instanceOf(immutable.Map).isRequired
};

export default Home;
