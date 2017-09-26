import Component from 'react-pure-render/component';
import React from 'react';
import boundScroll from '../lib/boundScroll';
import json from '../data/roles.json';

if (process.env.IS_BROWSER) {
  require('./Roles.styl');
}

@boundScroll()
export default class Roles extends Component {
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

    const {actions: {saveRole, nextScreen}} = this.props;
    saveRole(this.state.role);
    nextScreen();
  }

  handleChooseRole(role) {
    this.setState({role: role}, () => this.proceed());
  }

  render() {
    return (
      <section className="third-screen screen">
        <h1>Choose your role</h1>
        <ul>
          {json.map((role) => {
            return (
              <li key={role.id} onClick={() => this.handleChooseRole(role)}>
                <div>
                  <img alt={`${role.name} path`} src={role.img} />
                  <p><strong>{role.name.split(' ')[0]}</strong> {role.name.split(' ')[1]}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
