import Component from '../components/component.react';
import classNames from 'classnames';
import React from 'react';
import './thank-you.styl';

class ThankYou extends Component {
  render() {
    const className = classNames('thank-you', this.props.className);
    return (
      <div className={className}>
        <div>
          <span>Thank you</span>
          <p>You'll hear from us very soon.</p>
        </div>
      </div>
    );
  }
}

export default ThankYou;
