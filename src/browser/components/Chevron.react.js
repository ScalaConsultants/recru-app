import Component from 'react-pure-render/component';
import classNames from 'classnames';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./Chevron.styl');
}

export default class Chevron extends Component {
  static propTypes = {
    isAnimated: React.PropTypes.bool,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    isAnimated: true
  }

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
