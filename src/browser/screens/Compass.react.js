import React from 'react';
import Component from 'react-pure-render/component';

import ScreenImage from '../components/ScreenImage.react';
import ValueItem from '../components/CompassItem.react';
import boundScroll from '../lib/boundScroll';
import ChevronIcon from '../components/ChevronIcon.react';

import data from '../data/scalac.json';

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
      img: '../../../assets/img/Compass.svg'
    };

    return (
      <section className="compass-screen screen">
        <div className="container">
          <ScreenImage data={compassUrl} />
          <div className="right">
            <div className="content">
              <div className="screen-content">
                <h1 className="heading-1">Use scalac compass</h1>
                <p className="screen-desc">{data.desc}</p>
                <div className="rules list">
                  {data.rules.map((element) =>
                    <ValueItem data={element} key={element.title}/>
                  )}
                </div>
                <h3>Our values:</h3>
                <div className="values list">
                  {data.values.map((element) =>
                    <ValueItem data={element} key={element.title}/>
                  )}
                </div>
              </div>
              <ChevronIcon isAnimated onClick={e => this.proceed(e)}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
