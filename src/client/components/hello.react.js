import Component from '../components/component.react';
import classNames from 'classnames';
import React from 'react';
import './hello.styl';

class Hello extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = classNames('hello', this.props.className);
    return (
      <span className={className}>{this.props.message}</span>
    );
  }
}

Hello.propTypes = {
  className: React.PropTypes.string,
  message: React.PropTypes.string
};

export default Hello;
