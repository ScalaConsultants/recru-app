import Component from '../components/component.react';
import Chevron from '../components/chevron.react';
import React from 'react';
import * as actions from './actions';
import immutable from 'immutable';
import boundScrollMixin from '../mixins/bound-scroll';
import reactMixin from 'react-mixin';
import SkillItem from '../components/skillItem.react';
import json from '../data/technologies.json';
import './fourth-screen.styl';

class FourthScreen extends Component {
  constructor(props) {
    super(props);
    this.proceed = this.proceed.bind(this);
  }

  proceed() {
    actions.nextScreen();
  }

  render() {
    var skills = json[this.props.candidate.get('role')], arr = [];
    if (typeof skills === 'object')
      arr = Object.keys(skills).map(function(key) { return skills[key]; });

    return (
      <section className="fourth-screen screen">
        <header>
          pack your bag
        </header>
        <p>show us, which skills you have</p>
        
        <ul>
        {arr.map(function(element) {
          return <SkillItem data={element} key={element.id}/>;
        })}
        </ul>

        <Chevron isAnimated={true} onClick={this.proceed}/>
      </section>
    );
  }

}

FourthScreen.propTypes = {
  candidate: React.PropTypes.instanceOf(immutable.Map).isRequired
};

reactMixin(FourthScreen.prototype, boundScrollMixin);

export default FourthScreen;
