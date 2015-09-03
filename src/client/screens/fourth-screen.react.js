import Component from '../components/component.react';
import Chevron from '../components/chevron.react';
import React from 'react';
import boundScrollMixin from '../mixins/bound-scroll';
import reactMixin from 'react-mixin';
import SkillItem from '../components/skillItem.react';
import technologies from '../data/technologies.json';
import './fourth-screen.styl';

export default class FourthScreen extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired
  };

  proceed() {
    const {actions: {screens}} = this.props;
    screens.nextScreen();
  }

  render() {
    const skills = technologies[this.props.candidate.role.id];
    let skillsForCurrentRole = [];

    if (typeof skills === 'object')
      skillsForCurrentRole = Object.keys(skills).map((key) => skills[key]);

    return (
      <section className="fourth-screen screen">
        <header>
          pack your bag
        </header>
        <p>show us, which skills you have</p>
        <ul>
        {skillsForCurrentRole.map((skill) =>
          <SkillItem actions={this.props.actions} data={skill} key={skill.id}/>
        )}
        </ul>
        <Chevron isAnimated={true} onClick={::this.proceed}/>
      </section>
    );
  }

}

reactMixin(FourthScreen.prototype, boundScrollMixin);
