import Component from 'react-pure-render/component';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SkillItem extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {hintDisplayed: false, touched: false};
  }

  handleChange = (level, e) => {
    const {actions: {saveSkill}} = this.props;
    saveSkill(this.props.data, level);
    this.setState({touched: true});
  }

  setHintVisibility = (visible) => {
    this.setState({hintDisplayed: visible});
  }

  handleMouseEnter = () => this.setHintVisibility(true);
  handleMouseLeave = () => this.setHintVisibility(false);

  render() {
    let hint;
    const cb = {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    };

    if (this.state.hintDisplayed) {
      hint = (<div {...cb} className="hint">{this.props.data.name}</div>);
    }

    const className = classNames({active: this.state.touched});

    return (
      <li>
        {hint}
        <div>
          <img
            alt={this.props.data.name}
            className={className}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            src={this.props.data.src}
          />
        </div>
        <form action="">
          <input className="star star-5" id={`star5_${this.props.data.id}`} name="star" onChange={(e) => this.handleChange(5, e)} type="radio"/>
          <label className="star star-5" htmlFor={`star5_${this.props.data.id}`} />

          <input className="star star-4" id={`star4_${this.props.data.id}`} name="star" onChange={(e) => this.handleChange(4, e)} type="radio"/>
          <label className="star star-4" htmlFor={`star4_${this.props.data.id}`} />

          <input className="star star-3" id={`star3_${this.props.data.id}`} name="star" onChange={(e) => this.handleChange(3, e)} type="radio"/>
          <label className="star star-3" htmlFor={`star3_${this.props.data.id}`} />

          <input className="star star-2" id={`star2_${this.props.data.id}`} name="star" onChange={(e) => this.handleChange(2, e)} type="radio" />
          <label className="star star-2" htmlFor={`star2_${this.props.data.id}`} />

          <input className="star star-1" id={`star1_${this.props.data.id}`} name="star" onChange={(e) => this.handleChange(1, e)} type="radio"/>
          <label className="star star-1" htmlFor={`star1_${this.props.data.id}`} />
        </form>
      </li>
    );
  }
}
