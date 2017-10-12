import React from 'react';
import Component from 'react-pure-render/component';

import LeftItem from '../components/LeftItem.react';
import Item from '../components/CompassItem.react';
import JobDescription from '../components/JobDescription.react';
import boundScroll from '../lib/boundScroll';
import Chevron from '../components/Chevron.react';

import data from '../data/scalac.json'

if (process.env.IS_BROWSER) {
  require('./Compass.styl');
}

@boundScroll()
export default class Compass extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  render() {
    const compassUrl = {
      img: "../../../assets/img/Compass.svg"
    };

    return (
      <section className="compass-screen screen">
        <div className="container">
          <LeftItem data={compassUrl} />
          <div className="right">
            <div className="content">
              <div className="screen-content">
                <h1>
                  Use scalac compass
                </h1>
                <p className="screen-desc">{data.desc}</p>
                <div className="rules list">
                  {data.rules.map((element) =>
                    <Item data={element} key={element.title}/>
                  )}
                </div>
                <h3>Our values:</h3>
                <div className="values list">
                  {data.values.map((element) =>
                    <Item data={element} key={element.title}/>
                  )}
                </div>
              </div>
              <Chevron isAnimated onClick={e => this.proceed(e)}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
