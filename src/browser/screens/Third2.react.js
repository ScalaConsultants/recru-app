import Chevron from '../components/Chevron.react';
import React from 'react';
import BagImg from '../components/BagImg.react';
import SignpostImg from '../components/SignpostImg.react';
import BackpackList from '../components/BackpackList.react';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./Third2.styl');
}

export default class Third2Screen extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    isCurrent: PropTypes.bool
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  handleEnterKey() {
    this.proceed();
  }

  render() {
    return (
      <section className='third2-screen screen'>
        <div className='screen-title'>
          <h1>
            <strong>Pack Your bag</strong>
          </h1>
        </div>
        <BackpackList />
        <BagImg />
        <SignpostImg {...this.props} animate={this.props.isCurrent} />
        <Chevron isAnimated onClick={e => this.proceed(e)} />
      </section>
    );
  }
}
