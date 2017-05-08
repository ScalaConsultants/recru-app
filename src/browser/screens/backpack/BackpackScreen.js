import Chevron from '../../components/Chevron.react';
import React from 'react';
import BagImg from '../../components/BagImg.react';
import SignpostImg from '../../components/SignpostImg.react';
import BackpackList from '../../components/BackpackList.react';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./BackpackScreen.styl');
}

export default class Third2Screen extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.proceed = this.proceed.bind(this);
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  handleMoveDownKeys() {
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
        {/*<BackpackList />*/}
        <BagImg />
        {/*<SignpostImg {...this.props} animate={this.props.screens.currentScreen === 3} />*/}
        <Chevron isAnimated
                 onClick={this.proceed} />
      </section>
    );
  }
}
