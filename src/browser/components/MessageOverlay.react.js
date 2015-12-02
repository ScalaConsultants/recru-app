import Component from 'react-pure-render/component';
import classNames from 'classnames';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./MessageOverlay.styl');
}

export default class MessageOverlay extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    content: React.PropTypes.string,
    title: React.PropTypes.string
  }

  render() {
    const className = classNames('message-overlay', this.props.className);
    return (
      <div className={className}>
        <div>
          <span>{this.props.title}</span>
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}
