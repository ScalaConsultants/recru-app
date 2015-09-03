import Component from '../components/component.react';
import classNames from 'classnames';
import React from 'react';
import './hello.styl';

export default class Hello extends Component {
  render() {
    const className = classNames('hello', this.props.className);
    return (
      <div className={className}><span>{this.props.message}</span></div>
    );
  }
}

Hello.propTypes = {
  className: React.PropTypes.string,
  message: React.PropTypes.string
};
