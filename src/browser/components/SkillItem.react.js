import Component from 'react-pure-render/component';
import React from 'react';

export default class SkillItem extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired
  }

  handleChange(level, e) {
    const {actions: {saveSkill}} = this.props;
    saveSkill(this.props.data, level);
  }

  render() {
    return (
      <li>
        <img alt={this.props.data.name} src={this.props.data.src}/>
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
