import Component from 'react-pure-render/component';
import Chevron from '../components/Chevron.react';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./Second.styl');
}

export default class SecondScreen extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  render() {
    return (
      <section className="second-screen screen">
        <div>
          <div className="left-side">
            <img className="cloud c1" src="../../../assets/img/second/cloud-1.svg" />
            <img className="cloud c2" src="../../../assets/img/second/cloud-2.svg" />
          </div>
          <div className="right-side">
            <div>
              <p>There are</p>
              <p>several ways</p>
              <p>to explore</p>
            </div>
            <div className="path" onClick={() => this.proceed()}>
              <img className="scalac" src="../../../assets/img/second/scalac-logo.svg" />
              <h2>choose your path</h2>
            </div>
            <div className="arrow">
              <Chevron color="red" isAnimated onClick={e => this.proceed(e)} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
