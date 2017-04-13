import Component from 'react-pure-render/component';
import Chevron from '../components/Chevron.react';
import React from 'react';
import boundScroll from '../lib/boundScroll';
import SkillItem from '../components/SkillItem.react';
import technologies from '../data/technologies.json';

if (process.env.IS_BROWSER) {
  require('./Fourth.styl');
}

@boundScroll()
export default class FourthScreen extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired,
    isCurrent: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      hintDisplayed: false
    };
  }

  handleMoveUp() {
    this.setState({error: null});
  }

  handleEnterKey() {
    this.proceed();
  }

  handleKeyUp(e) {
    this.setState({error:null})
    let otherSkill = e.target.value;
    const {actions: {saveOtherSkill}} = this.props;
    saveOtherSkill(otherSkill);
  }

  proceed() {
    if ((this.props.candidate.skills.size < 1) && ((this.props.candidate.otherSkill).trim() === '')) {
      this.setState({error: 'Select Your skills / Write about Your skills :)'});
      return;
    }

    this.setState({error: null});

    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  render() {
    const skills = technologies[this.props.candidate.role.id];
    let skillsForCurrentRole = [];

    if (typeof skills === 'object') {
      skillsForCurrentRole = Object.keys(skills).map((key) => skills[key]);
    }

    let errorBody;
    if (this.state.error) {
      errorBody = <div id='error-text'><span>{this.state.error}</span></div>;
    }

    return (
      <section className="fourth-screen screen">
        <header className="screen-title">
          <h1>
            <strong>Skills package</strong>
          </h1>
        </header>
        <div className="skills">
          <div className="geek-img">
            <img alt="Geek" src="../../../assets/img/skills/geek.svg"/>
          </div>
          <ul>
            {skillsForCurrentRole.map((skill) =>
              <SkillItem actions={this.props.actions} data={skill} key={skill.id}/>
            )}
            <li className="otherSkill">
              {this.state.hintDisplayed ? <div className='hint'>Other skills</div> : false};
              <div className="otherSkill-img"
                   onMouseEnter={ (e) => this.setState({hintDisplayed:true})}
                   onMouseLeave={ (e) => this.setState({hintDisplayed:false})}
              >
                <img alt="Other skills" src="../../../assets/img/skills/skills_gears.svg"/>
              </div>
              <div className="otherSkill-text">
                <textarea cols="16" maxLength="500" onChange={e => this.handleKeyUp(e)} placeholder="Do You have other skills?" ref="otherSkill" rows="2"/>
              </div>
            </li>
          </ul>
        </div>
        {this.state.error ? errorBody : null}
        <Chevron isAnimated onClick={e => this.proceed(e)}/>
      </section>
    );
  }
}
