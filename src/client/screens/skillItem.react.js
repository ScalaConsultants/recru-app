import Component from '../components/component.react';
import React from 'react';

export default class SkillItem extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return <li>{this.props.data.name}</li>;
  }
  
  
}