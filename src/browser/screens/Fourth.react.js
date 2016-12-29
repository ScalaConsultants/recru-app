import Component from 'react-pure-render/component';
import Chevron from '../components/Chevron.react';
import React from 'react';
// import ReactDOM from 'react-dom';
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
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {error: null};
  }

  resetErrorStatus() {
    this.setState(this.getDefaultState());
  }

  handleMoveUp() {
    this.setState(this.getDefaultState());
  }

  handleEnterKey() {
    this.proceed();
  }

  handleKeyUp(e) {
    this.resetErrorStatus();
    let otherSkill = e.target.value;
    // console.log(e.target.value);
    // let otherSkill = ReactDOM.findDOMNode(this.refs.otherSkill).value;
    // console.log("otherSkill");
    // console.log(otherSkill);
    // console.log('this.refs');
    // console.log(this.refs);
    const {actions: {saveOtherSkill}} = this.props;
    saveOtherSkill(otherSkill);
    // console.log('this.props.candidate.otherSkill');
    // console.log(this.props.candidate.otherSkill);
    // console.log(this.props.candidate.otherSkill.length);
  }

  proceed() {
    if ((this.props.candidate.skills.size < 1) && ((this.props.candidate.otherSkill).trim() === '')) {
      this.setState({error: 'Select Your skills / Write about Your skills :)'});
      return;
    }

    this.resetErrorStatus();

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
      errorBody = <div id="error-text"><span>{this.state.error}</span></div>;
    }

    return (
      <section className="fourth-screen screen">
        <header className="screen-title">
          <h1>
            <strong>Skills package</strong>
          </h1>
        </header>
        <div className="myDiv">
          <div className="geek-img">
            <img alt="Geek" src="../../../assets/img/skills/geek.svg"/>
          </div>
          <ul>
            {skillsForCurrentRole.map((skill) =>
              <SkillItem actions={this.props.actions} data={skill} key={skill.id} resetErrorStatus={this.resetErrorStatus.bind(this)}/>
            )}
            <li className="otherSkills">
              <img alt="xxx" src="../../../assets/img/packYourBag/scalac_logo.png"/>
              <span><strong>Do You have other skills?</strong></span>
              <textarea cols="20" maxLength="500" onChange={e => this.handleKeyUp(e)} placeholder="Other skills..." ref="otherSkill" rows="2"></textarea>
            </li>
          </ul>
        </div>
        {this.state.error ? errorBody : null}
        <Chevron isAnimated onClick={e => this.proceed(e)}/>
      </section>
    );
  }
}
