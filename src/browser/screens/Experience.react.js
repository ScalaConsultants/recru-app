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

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      exp: ''
    };
  }

  proceed() {
    if (!this.state.exp)
      return;

    const {actions: {saveExp, nextScreen}} = this.props;
    saveExp(this.state.exp);
    nextScreen();
  }

  selectLevel(exp) {
    this.setState({exp: exp}, () => this.proceed());
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
              <div className="experience">
                <h1>Choose your experience</h1>
                <div>
                  <p>{data.experience.subtitle}</p>
                  <p className="bold">{data.experience.command}</p>

                  <div className="experience-level">
                    {data.experience.levels.map(level => {
                      return (
                          <div
                            key={level.id}
                            onClick={() => this.selectLevel(level)}
                            className={this.state.exp.id === level.id ? 'active level' : 'level'}
                          >
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
            </div>
            <Chevron isAnimated onClick={e => this.proceed(e)}/>
          </div>
        </div>
      </section>
    );
  }
}
