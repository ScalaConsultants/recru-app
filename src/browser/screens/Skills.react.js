import React from 'react';
import PropTypes from 'prop-types';
import Component from 'react-pure-render/component';
import TagsInput from 'react-tagsinput';

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
    actions: PropTypes.object.isRequired,
    candidate: PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {skills: []};
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  handleChange(skills) {
    this.setState({skills});
    const {actions: {saveExtraSkill}} = this.props;
    saveExtraSkill(skills);
  }

  defaultRenderInput(props) {
    const {placeholder, onChange, value, addTag, ...other} = props; // eslint-disable-line no-unused-vars
    return (
      <input
        onChange={onChange}
        placeholder="Skill name"
        tabIndex="-1"
        type='text'
        value={value}
        {...other}
      />
    );
  }


  render() {
    const skills = technologies[this.props.candidate.role.id] || {};
    const skillsForCurrentRole = Object.keys(skills).map((key) => skills[key]);
    const backpackUrl = {
      img: '../../../assets/img/backpack.svg'
    };

    return (
      <section className="skills-screen screen">
        <div className="container">
          <ScreenImage data={backpackUrl} />
          <div className="right">
            <div className="content-skills">
              <div className="screen-title">
                <h1 className="heading-1">pack your bag</h1>
                <p className="screen-desc">
                  { this.props.candidate.name
                    ?
                    `${this.props.candidate.name}, ${technologies.title}`
                    :
                    `${technologies.title}`
                  }
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
                    onChange={e => this.handleChange(e)}
                    renderInput={this.defaultRenderInput}
                    value={this.state.skills}
                  />
                </div>
              </div>
              <div />
            </div>
            <ChevronIcon isAnimated onClick={e => this.proceed(e)}/>
          </div>
        </div>
      </section>
    );
  }
}
