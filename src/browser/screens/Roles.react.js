import Component from 'react-pure-render/component';
import React from 'react';

import boundScroll from '../lib/boundScroll';
import Alert from '../components/Alert.react';
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
      role: null,
      select: false,
      current: ''
    };
  }

  proceed() {
    if (!this.state.role) {
      this.setState({select: "select"});
      setTimeout(() => { this.setState({select: false}); }, 5000);
    } else {
      const {actions: {saveRole, nextScreen}} = this.props;
      saveRole(this.state.role);
      this.setState({current: this.state.role.id});
      this.setState({select: false});
      nextScreen();
    }
  }

  handleChooseRole(role) {
    this.setState({role: role}, () => this.proceed());
  }

  render() {
    return (
      <section className="roles-screen screen">
        {this.state.select === "select" && <Alert desc={"role"}/> }
        <h1>Who are you?</h1>
        <ul>
          {json.map((role) => {
            return (
              <li key={role.id} onClick={() => this.handleChooseRole(role)}>
                <div>
                  <img alt={`${role.name} path`} src={role.img} />
                  <p className={this.state.current === role.id && 'selected'}>
                    <strong>{role.name.split(' ')[0]}</strong>
                    {role.name.split(' ')[1]}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
