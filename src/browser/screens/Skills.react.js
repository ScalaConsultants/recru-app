import React from 'react';
import Component from 'react-pure-render/component';

import boundScroll from '../lib/boundScroll';
import Chevron from '../components/Chevron.react';
import SkillItem from '../components/SkillItem.react';
import LeftItem from '../components/LeftItem.react';
import technologies from '../data/technologies.json';

if (process.env.IS_BROWSER) {
  require('./Skills.styl');
}

@boundScroll()
export default class Skills extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  render() {
    const skills = technologies[this.props.candidate.role.id];
    const backpackUrl = {
      img: "../../../assets/img/plecak.svg"
    };

    let skillsForCurrentRole = [];

    if (typeof skills === 'object')
      skillsForCurrentRole = Object.keys(skills).map((key) => skills[key]);

    return (
      <section className="skills-screen screen">
        <div className="container">
          <LeftItem data={backpackUrl} />
          <div className="right">
            <h1>
              pack your bag
            </h1>
            <p>show us, which skills you have</p>
            <ul>
            {skillsForCurrentRole.map((skill) =>
              <SkillItem actions={this.props.actions} data={skill} key={skill.id}/>
            )}
            </ul>
            <Chevron isAnimated onClick={e => this.proceed(e)}/>
          </div>
        </div>
      </section>
    );
  }
}
