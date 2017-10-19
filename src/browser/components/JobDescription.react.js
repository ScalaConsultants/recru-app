import Component from 'react-pure-render/component';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./JobDescription.styl');
}

export default class LeftItem extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render() {
    const data = this.props.data || '';

    return (
      <div className="content job">
        <div className="thin">
          <h1>
            {data.name}
          </h1>
          <p className="screen-desc">
            {data.who}
          </p>
          <h3>What is your mission in Scalac?</h3>
          <ul>
            {
              data.what && data.what.map(item => {
                return(
                  <li key={item.id}>{item.desc}</li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
