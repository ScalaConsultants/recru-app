import React from 'react';
import PropTypes from 'prop-types';
import Component from 'react-pure-render/component';

import ScreenImage from '../components/ScreenImage.react';
import boundScroll from '../lib/boundScroll';
import ChevronIcon from '../components/ChevronIcon.react';
import data from '../data/check.json';

if (process.env.IS_BROWSER) {
  require('./Check.styl');
}

@boundScroll()
class Check extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    candidate: PropTypes.object.isRequired
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
      img: '../../../assets/img/checkifyouhaveit.svg'
    };

    return (
      <section className="check-screen screen">
        <div className="container">
          <ScreenImage data={backpackUrl} />
          <div className="right">
            <div className="content">
              <div className="screen-content">
                <h1 className="heading-1">check if we look in the same direction</h1>
                <div className="checkbox-list">
                  {
                    specificData.skillset &&
                      specificData.skillset.map(feature =>
                        (<div className="list-item" key={feature.id}>
                          <input
                            id={`for${feature.id}`}
                            onChange={(e) => this.handleChange(feature)}
                            type="checkbox"
                            value={feature.desc}
                          />
                          <label htmlFor={`for${feature.id}`}>
                            {feature.desc}
                          </label>
                        </div>)
                      )
                  }
                </div>
              </div>
            </div>
            <ChevronIcon isAnimated onClick={e => this.proceed(e)}/>
          </div>
        </div>
      </section>
    );
  }
}
export default Check;
