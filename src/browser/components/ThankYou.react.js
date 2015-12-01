import Component from 'react-pure-render/component';
import classNames from 'classnames';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./ThankYou.styl');
}

export default class ThankYou extends Component {
  static propTypes = {
    className: React.PropTypes.string
  }

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
