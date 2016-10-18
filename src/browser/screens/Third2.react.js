import Component from 'react-pure-render/component';
import Chevron from '../components/Chevron.react';
import React from 'react';
import BagImg from '../components/BagImg.react';
import SignpostImg from '../components/SignpostImg.react';
import BackpackList from '../components/BackpackList.react';
import backpackList from '../data/backpackListItems.json';

if (process.env.IS_BROWSER) {
  require('./Third2.styl');
}

export default class Third2Screen extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    isCurrent: React.PropTypes.bool
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
      <section className="third2-screen screen">
        <div className="screen-title">
          <h1>
            <span><strong>Pack Your bag</strong></span>
          </h1>
        </div>
        <div className="screen-list">
          <BackpackList animate={this.state.animateFirst} items={backpackList['equipment']}
                        onAnimationFinished={this.onBackpackListAnimationFinished.bind(this)} />
          {/*<BackpackList animate={this.state.animateSecond} items={backpackList['benefits']}/>*/}
        </div>
        <BagImg />
        <SignpostImg {...this.props} animate={this.state.animateFirst} />
        <Chevron isAnimated onClick={e => this.proceed(e)} />
      </section>
    );
  }
}
