import Component from 'react-pure-render/component';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./CompassItem.styl');
}

export default class CompassItem extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render() {
    const data = this.props.data || '';

    return (
      <div className="item">
        <img src={data.img} />
        <p>{data.title}</p>
        <span>{data.subtitle}</span>
      </div>
    );
  }
}
