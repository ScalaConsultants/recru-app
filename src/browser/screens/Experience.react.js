import React from 'react';
import Component from 'react-pure-render/component';

import LeftItem from '../components/LeftItem.react';
import JobDescription from '../components/JobDescription.react';
import boundScroll from '../lib/boundScroll';
import Chevron from '../components/Chevron.react';
import data from '../data/equipment.json';

if (process.env.IS_BROWSER) {
  require('./Experience.styl');
}

@boundScroll()
export default class Experience extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  render() {
    const backpackUrl = {
      img: "../../../assets/img/mountain-w-flag.svg"
    };

    return (
      <section className="experience-screen screen">
        <div className="container">
          <LeftItem data={backpackUrl} />
          <div className="right">
            <div className="content">
              <h1>Choose your experience</h1>
              <div>
                <p>{data.experience.subtitle}</p>
                <p className="bold">{data.experience.command}</p>

                <div className="experience-level">
                  {data.experience.levels.map(level => {
                    return (
                        <div className="level" key={level.id}>
                          <div className="icons">
                            {level.stars.map(element => {
                                return (
                                  <img key={element} src={data.experience.arrow} alt={element}/>
                                );
                            })}
                          </div>
                          <div className="desc">
                            <h4>{level.position}</h4>
                            <h5>{level.desc}</h5>
                          </div>
                        </div>
                    );
                  })}
                </div>

              </div>
            </div>
            <Chevron isAnimated onClick={e => this.proceed(e)}/>
          </div>
        </div>
      </section>
    );
  }
}
