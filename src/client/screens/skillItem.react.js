import Component from '../components/component.react';
import React from 'react';
import {saveSkill} from '../candidate/actions';

export default class SkillItem extends Component {
  constructor(props) {
    super(props);
  }
  
  handleChange(rate,e) {
    saveSkill(this.props.data.id, rate);
  }
  
  render() {
    return <li>
            <img src={this.props.data.src} />
            <form action="">
              <input className="star star-5" id={"star5_"+this.props.data.id} onChange={this.handleChange.bind(this,5)} type="radio" name="star"/>
              <label className="star star-5" htmlFor={"star5_"+this.props.data.id}></label>
              <input className="star star-4" id={"star4_"+this.props.data.id} onChange={this.handleChange.bind(this,4)} type="radio" name="star"/>
              <label className="star star-4" htmlFor={"star4_"+this.props.data.id}></label>
              <input className="star star-3" id={"star3_"+this.props.data.id} onChange={this.handleChange.bind(this,3)} type="radio" name="star"/>
              <label className="star star-3" htmlFor={"star3_"+this.props.data.id}></label>
              <input className="star star-2" id={"star2_"+this.props.data.id} onChange={this.handleChange.bind(this,2)} type="radio" name="star"/>
              <label className="star star-2" htmlFor={"star2_"+this.props.data.id}></label>
              <input className="star star-1" id={"star1_"+this.props.data.id} onChange={this.handleChange.bind(this,1)} type="radio" name="star"/>
              <label className="star star-1" htmlFor={"star1_"+this.props.data.id}></label>
            </form>
          </li>;
  }
  
  
}