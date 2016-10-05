import Component from 'react-pure-render/component';
import Chevron from '../components/Chevron.react';
import React from 'react';
import BackpackList from '../components/BackpackList.react';

if (process.env.IS_BROWSER) {
  require('./Fourth.styl');
  // require('velocity-animate');
  // require('velocity-animate/velocity.ui');
}

export default class FourthScreen extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    isCurrent: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      animateFirst: nextProps.isCurrent
    });
  }

  getDefaultState() {
    return {
      animateFirst: false,
      animateSecond: false
    };
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  handleEnterKey() {
    this.proceed();
  }

  onBackpackListAnimationFinished() {
    this.setState({
      animateSecond: true
    });
  }

  render() {
    return (
        <section className="fourth-screen screen">
          <div className="screen-title">
            <h1>
              <span><strong>Pack Your bag</strong></span>
            </h1>
          </div>
          <div className="screen-img">
            <img alt='Scalac Logo' src="assets/img/plecak_1.png"/>
          </div>
          <div className="screen-list">
            <BackpackList animate={this.state.animateFirst} items={['computer', 'headphones', 'pens', 'notebook', 'calendar', 'hoodie', 't-shirt', 'socks']} onAnimationFinished={this.onBackpackListAnimationFinished.bind(this)} />
            <BackpackList animate={this.state.animateSecond} items={['team working', 'best integration ever', 'friendliness', 'professional cooperation', 'proactive people', 'equality']} />
          </div>

          <Chevron isAnimated onClick={e => this.proceed(e)}/>
        </section>
    );
  }
}
