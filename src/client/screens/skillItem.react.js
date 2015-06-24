import Component from '../components/component.react';
import React from 'react';
import {saveSkill} from '../candidate/actions';

class SkillItem extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(rate, e) {
    saveSkill(this.props.data.id, rate);
  }

  render() {
    return (
      <li>
        <img src={this.props.data.src} />
        <form action="">
          <input className="star star-5" id={`star5_${this.props.data.id}`} name="star" onChange={(e) => this.handleChange(5, e)} type="radio"/>
          <label className="star star-5" htmlFor={`star5_${this.props.data.id}`}></label>

          <input className="star star-4" id={`star4_${this.props.data.id}`} name="star" onChange={(e) => this.handleChange(4, e)} type="radio"/>
          <label className="star star-4" htmlFor={`star4_${this.props.data.id}`}></label>

          <input className="star star-3" id={`star3_${this.props.data.id}`} name="star" onChange={(e) => this.handleChange(3, e)} type="radio"/>
          <label className="star star-3" htmlFor={`star3_${this.props.data.id}`}></label>

          <input className="star star-2" id={`star2_${this.props.data.id}`} name="star" onChange={(e) => this.handleChange(2, e)} type="radio" />
          <label className="star star-2" htmlFor={`star2_${this.props.data.id}`}></label>

          <input className="star star-1" id={`star1_${this.props.data.id}`} name="star" onChange={(e) => this.handleChange(1, e)} type="radio"/>
          <label className="star star-1" htmlFor={`star1_${this.props.data.id}`}></label>
        </form>
      </li>
    );
  }


}

SkillItem.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default SkillItem;
