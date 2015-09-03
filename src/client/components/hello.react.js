import Component from '../components/component.react';
import classNames from 'classnames';
import React from 'react';
import './hello.styl';

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
