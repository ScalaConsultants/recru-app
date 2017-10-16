import React from 'react';
import Component from 'react-pure-render/component';

import LeftItem from '../components/LeftItem.react';
import JobDescription from '../components/JobDescription.react';
import boundScroll from '../lib/boundScroll';
import Chevron from '../components/Chevron.react';
import data from '../data/check.json';

if (process.env.IS_BROWSER) {
  require('./Check.styl');
}

@boundScroll()
export default class Check extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  handleChange(feature) {
    const {actions: {saveFeature}} = this.props;
    saveFeature(feature);
  }

  render() {
    const specificData = data[this.props.candidate.role.id] || [];
    const backpackUrl = {
      img: "../../../assets/img/plecak.svg"
    };

    return (
      <section className="check-screen screen">
        <div className="container">
          <LeftItem data={backpackUrl} />
          <div className="right">
            <div className="content">
              <div className="screen-content">
                <h1>Check, if you have it:</h1>
                <div className="checkbox-list">
                    {
                      specificData.skillset &&
                      specificData.skillset.map(feature => {
                        return (
                          <div className="list-item" key={feature.id}>
                            <input
                              type="checkbox"
                              id={`for${feature.id}`}
                              value={feature.desc}
                              onChange={(e) => this.handleChange(feature)}
                            />
                            <label htmlFor={`for${feature.id}`}>
                              {feature.desc}
                            </label>
                          </div>
                        );
                      })
                    }
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
