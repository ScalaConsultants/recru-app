import React from 'react';
import Component from 'react-pure-render/component';

import LeftItem from '../components/LeftItem.react';
import Item from '../components/CompassItem.react';
import JobDescription from '../components/JobDescription.react';
import boundScroll from '../lib/boundScroll';
import Chevron from '../components/Chevron.react';

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
    this.state = {currentTab: {id: 0}};
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  renderList() {
    let dataSet = data[this.state.currentTab.id];
    return (
      dataSet.map(element => {
          return (
            <li key={element}>
              <p>{element}</p>
            </li>
          );
        }
      )
    )
  }

  toggleTab(id) {
    this.setState({
      currentTab: {...this.state.currentTab, id}
    })
  }

  render() {
    const equipmentUrl = {
      img: "../../../assets/img/equipment.svg"
    };

    return (
      <section className="equipment-screen screen">
        <div className="container">
          <LeftItem data={equipmentUrl} />
          <div className="right">
            <div className="content">
              <h1>
                Check your equipment
              </h1>
              <p className="desc">{data.desc}</p>
              <div className="options list">
                {data.options.map((element) =>
                  <div className="option" key={element.id} onClick={() => this.toggleTab(element.id)}>
                    <img src={element.id === this.state.currentTab.id ? element.active : element.img} alt={element.title} />
                    <p>{element.title}</p>
                  </div>
                )}
              </div>
              <div className="content-list">
                <ul>
                  {this.renderList()}
                </ul>
              </div>
              <Chevron isAnimated onClick={e => this.proceed(e)}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
