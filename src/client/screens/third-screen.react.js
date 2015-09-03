import Component from '../components/component.react';
import React from 'react';
import boundScroll from '../mixins/bound-scroll';
import json from '../data/roles.json';
import './third-screen.styl';

@boundScroll()
export default class ThirdScreen extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      role: null
    };
  }

  proceed() {
    if (!this.state.role)
      return;

    const {actions: {screens, candidate}} = this.props;
    candidate.saveRole(this.state.role);
    screens.nextScreen();
  }

  handleChooseRole(role) {
    this.setState({role: role}, () => this.proceed());
  }

  render() {
    return (
      <section className="third-screen screen">
        <ul>
          {json.map((role) => {
            return (
              <li key={role.id} onClick={() => this.handleChooseRole(role)}>
                <p><strong>{role.name.split(' ')[0]}</strong> {role.name.split(' ')[1]}</p>
                <div>
                  <img alt={`${role.name} path`} src={role.img} />
                  <p>{role.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
