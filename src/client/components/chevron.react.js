import Component from '../components/component.react';
import classNames from 'classnames';
import React from 'react';
import './chevron.styl';

export default class Chevron extends Component {
  render() {
    let className = classNames("chevron", {
      '-animated': !!this.props.animated,
      '-clickable': !!this.props.onClick
    });

    return (
      <div onClick={this.props.onClick} className={className}>
        <i></i>
      </div>
    );
  }

}
