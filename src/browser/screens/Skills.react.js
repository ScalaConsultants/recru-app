import React from 'react';
import Component from 'react-pure-render/component';
import TagsInput from 'react-tagsinput';

import boundScroll from '../lib/boundScroll';
import ChevronIcon from '../components/ChevronIcon.react';
import SkillItem from '../components/SkillItem.react';
import ScreenImage from '../components/ScreenImage.react';
import technologies from '../data/technologies.json';

import 'react-tagsinput/react-tagsinput.css';

if (process.env.IS_BROWSER) {
  require('./Skills.styl');
}

export default class Skills extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {skills: []}
    this.handleChange = this.handleChange.bind(this);
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  handleChange(skills) {
    this.setState({skills})
    const {actions: {saveExtraSkill}} = this.props;
    saveExtraSkill(skills);
  }

  render() {
    const skills = technologies[this.props.candidate.role.id] || {};
    const backpackUrl = {
      img: "../../../assets/img/plecak.svg"
    };

    let skillsForCurrentRole = Object.keys(skills).map((key) => skills[key]);

    function defaultRenderInput (props) {
      const {placeholder, onChange, value, addTag, ...other} = props
      return (
        <input type='text' tabIndex="-1" placeholder="Skill name" onChange={onChange} value={value} {...other} />
      )
    }

    return (
      <section className="skills-screen screen">
        <div className="container">
          <ScreenImage data={backpackUrl} />
          <div className="right">
            <div className="content-skills">
              <div className="screen-title">
                <h1 className="heading-1">pack your bag</h1>
                <p className="screen-desc">
                  { this.props.candidate.name ? `${this.props.candidate.name}, ${technologies.title}` : `${technologies.title}` }
                </p>
              </div>
              <div className="skills-block">
                <ul>
                {skillsForCurrentRole.map((skill) =>
                  <SkillItem actions={this.props.actions} data={skill} key={skill.id}/>
                )}
                </ul>
                <div className="tags-wrapper">
                  <p>Other skills:</p>
                  <TagsInput
                    value={this.state.skills}
                    onChange={this.handleChange}
                    renderInput={defaultRenderInput}
                  />
                </div>
              </div>
              <div></div>
            </div>
            <ChevronIcon isAnimated onClick={e => this.proceed(e)}/>
          </div>
        </div>
      </section>
    );
  }
}
