import Component from 'react-pure-render/component';
import Chevron from '../components/Chevron.react';
import React from 'react';
import boundScroll from '../lib/boundScroll';
import SkillItem from '../components/SkillItem.react';
import technologies from '../data/technologies.json';

if (process.env.IS_BROWSER) {
  require('./Fifth.styl');
}

@boundScroll()
export default class FifthScreen extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired,
    isCurrent: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {error: null};
  }

  handleMoveUp() {
    this.setState(this.getDefaultState());
  }

  proceed() {
    if (this.props.candidate.skills.size < 1) {
      this.setState({error: 'You must be good at least at something :)'});
      return;
    }

    this.setState(this.getDefaultState());

    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  render() {
    const skills = technologies[this.props.candidate.role.id];
    let skillsForCurrentRole = [];

    if (typeof skills === 'object') {
      skillsForCurrentRole = Object.keys(skills).map((key) => skills[key]);
    }

    let errorBody;
    if (this.state.error) {
      errorBody = <div id="error-text"><span>{this.state.error}</span></div>;
    }

    return (
      <section className="fifth-screen screen">
        <header>
          pack your bag
        </header>
        <p>show us, which skills you have</p>
        <ul>
          {skillsForCurrentRole.map((skill) =>
            <SkillItem actions={this.props.actions} data={skill} key={skill.id}/>
          )}
        </ul>
        {errorBody}
        <Chevron isAnimated onClick={e => this.proceed(e)}/>
      </section>
    );
  }
}
