import React from 'react';
import Component from 'react-pure-render/component';
import classNames from 'classnames';

import ScreenImage from '../components/ScreenImage.react';
import Item from '../components/CompassItem.react';
import JobDescription from '../components/JobDescription.react';
import boundScroll from '../lib/boundScroll';
import ChevronIcon from '../components/ChevronIcon.react';

import data from '../data/equipment.json'

if (process.env.IS_BROWSER) {
  require('./Equipment.styl');
}

@boundScroll()
export default class Compass extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {currentTab: 'tools'};
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  renderList() {
    const id = this.state.currentTab;
    return (
      data[id].map(element =>
        <li key={element}>
          {element}
        </li>
      )
    )
  }

  selectTab(id) {
    this.setState({
      currentTab: id
    })
  }

  render() {
    const equipmentUrl = {
      img: "../../../assets/img/equipment.svg"
    };

    const currentTab = this.state.currentTab;

    return (
      <section className="equipment-screen screen">
        <div className="container">
          <ScreenImage data={equipmentUrl} />
          <div className="right">
            <div className="content">
              <div className="screen-content">
                <h1 className="heading-1">Check your equipment</h1>
                <p className="desc screen-desc">{data.desc}</p>
                <div className="options list">
                  {data.options.map((element) =>
                    <div
                      key={element.id} onClick={() => this.selectTab(element.id)}
                      className={classNames('option', {'active' : element.id === currentTab})}
                    >
                      <div className="icon">
                        <img
                          src={element.id === this.state.currentTab ? element.active : element.img}
                          alt={element.title}
                        />
                      </div>
                      <p>{element.title}</p>
                    </div>
                  )}
                </div>
                <div className="content-list">
                  <ul>
                    {this.renderList()}
                  </ul>
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
