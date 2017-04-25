import Component from 'react-pure-render/component';
import React from 'react';
import PropTypes from 'prop-types';

export default class SkillItem extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {hintDisplayed: false};
  }

  handleStarChange(level, e) {
    const {actions: {saveSkill}} = this.props;
    saveSkill(this.props.data, level);
  }

  showHint() {
    this.setState({hintDisplayed: true});
  }

  hideHint() {
    this.setState({hintDisplayed: false});
  }

  render() {
    const starsLabels = [];
    const STARS_LENGTH = 5;
    for (let i = STARS_LENGTH; i >= 1; i--) {
      starsLabels.push(
          <input className={`star star-${i}`} id={`star${i}_${this.props.data.id}`} key={i} name="star" onChange={(e) => this.handleStarChange(i, e)} type="radio"/>,
          <label className={`star star-${i}`} htmlFor={`star${i}_${this.props.data.id}`} key={i + STARS_LENGTH} />
      );
    }

    return (
      <li>
        {this.state.hintDisplayed ? <div className="hint">{this.props.data.name}</div> : false}
        <img alt={this.props.data.name} onMouseEnter={()=>this.showHint()} onMouseLeave={()=>this.hideHint()} src={this.props.data.src}/>
        <form action="">
          {starsLabels}
        </form>
      </li>
    );
  }
}
