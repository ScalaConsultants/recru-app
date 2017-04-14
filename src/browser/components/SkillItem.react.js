import Component from 'react-pure-render/component';
import React from 'react';

export default class SkillItem extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {hintDisplayed: false};
  }

  handleChange(level, e) {
    const {actions: {saveSkill}} = this.props;
    saveSkill(this.props.data, level);
  }

  render() {
    const starsLabels = [];
    for (let i = 5; i >= 1; i--) {
      starsLabels.push(
          <input className={`star star-${i}`} id={`star${i}_${this.props.data.id}`} key={i} name="star" onChange={(e) => this.handleChange(i, e)} type="radio"/>,
          <label className={`star star-${i}`} htmlFor={`star${i}_${this.props.data.id}`} key={i + 5} />
      );
    }

    return (
      <li>
        {this.state.hintDisplayed ? <div className="hint">{this.props.data.name}</div> : false}
        <img alt={this.props.data.name} onMouseEnter={() => this.setState({hintDisplayed: true})} onMouseLeave={() => this.setState({hintDisplayed: false})} src={this.props.data.src}/>
        <form action="">
          {starsLabels}
        </form>
      </li>
    );
  }
}
