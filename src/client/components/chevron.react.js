import Component from '../components/component.react';
import classNames from 'classnames';
import React from 'react';
import './chevron.styl';

class Chevron extends Component {
  render() {
    const className = classNames('chevron', {
      '-animated': !!this.props.isAnimated,
      '-clickable': !!this.props.onClick
    });

    return (
      <div className={className} onClick={this.props.onClick}>
        <i></i>
      </div>
    );
  }
}

Chevron.propTypes = {
  isAnimated: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

Chevron.defaultProps = {
  isAnimated: true
};

export default Chevron;
