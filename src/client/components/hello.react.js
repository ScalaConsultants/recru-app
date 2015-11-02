import Component from 'react-pure-render/component';
import classNames from 'classnames';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./Hello.styl');
}

export default class Hello extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    message: React.PropTypes.string
  }

  render() {
    const className = classNames('hello', this.props.className);
    return (
      <div className={className}><span>{this.props.message}</span></div>
    );
  }
}
