import React from 'react';
import Component from 'react-pure-render/component';

import ScreenImage from '../components/ScreenImage.react';
import JobDescription from '../components/JobDescription.react';
import boundScroll from '../lib/boundScroll';
import ChevronIcon from '../components/ChevronIcon.react';
import Alert from '../components/Alert.react';
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
    this.state = {
      exp: '',
      select: false
    }
  }

  proceed() {
    if (!this.state.exp) {
      this.setState({select: true});
      setTimeout(() => { this.setState({select: false}); }, 5000);
    } else {
      const {actions: {saveExp, nextScreen}} = this.props;
      saveExp(this.state.exp);
      nextScreen();
    }
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
          <ScreenImage data={backpackUrl} />
          <div className="right">
            {this.state.select === true && <Alert desc={"level"}/> }
            <div className="content">
              <div className="experience">
                <div>
                  <h1 className="heading-1">CHOOSE THE TRAIL LEVEL</h1>
                  <p>{data.experience.subtitle}</p>
                  <p className="bold">{data.experience.command}</p>
                </div>

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
                            <h5>{level.desc}<span>*</span></h5>
                          </div>
                        </div>
                    );
                  })}
                </div>

                <div className="note">
                  <p>* invoice net amount on B2B contract (but contract of employment is  also possible)</p>
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
