import Component from 'react-pure-render/component';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./LeftItem.styl');
}

export default class LeftItem extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render() {
    const data = this.props.data || '';

    return (
      <div className="left">
        <img src={data.img} />
      </div>
    );
  }
}