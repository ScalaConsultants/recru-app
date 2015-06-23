import Component from '../components/component.react';
import Chevron from '../components/chevron.react';
import React from 'react';
import * as actions from './actions';
import immutable from 'immutable';
import SkillItem from './skillItem.react';
import json from '../data/technologies.json';
import './fourth-screen.styl';

class FourthScreen extends Component {
  constructor(props) {
    super(props);
    this.proceed = this.proceed.bind(this);
    this.skills = json[this.props.candidate.get('role')];
    
  }

  proceed() {
    // TODO: if the name is empty do not allow the transition and show the error
    actions.nextScreen();
  }

  render() {   
    var skills = json[this.props.candidate.get('role')], arr = [];
    if(typeof skills === 'object')
      arr = Object.keys(skills).map(function (key) {return skills[key]});
    
    return (
      <section className="fourth-screen screen">
        <header>pack your bag</header>
        <ul>
        {arr.map(function(element) {
          return <SkillItem key={element.id} data={element}/>;
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

export default FourthScreen;
