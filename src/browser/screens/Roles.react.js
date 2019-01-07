import Component from 'react-pure-render/component';
import React from 'react';

import classNames from 'classnames';
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
    this.state = {
      role: null,
      select: false,
      current: ''
    };
  }

  proceed() {
    if (!this.state.role) {
      this.setState({select: true});
      setTimeout(() => { this.setState({select: false}); }, 5000);
    }
    else {
      const {actions: {saveRole, nextScreen}} = this.props;
      saveRole(this.state.role);
      this.setState({current: this.state.role.id, select: false});
      nextScreen();
    }
  }

  handleChooseRole(role) {
    this.setState({role: role}, () => this.proceed());
  }

  render() {
    const current = this.state.current;

    return (
      <section className="roles-screen screen">
        {<Alert desc={"role"} select={this.state.select}/>}
        <h1 className="heading-1">Who are you?</h1>
        <ul>
          {json.map((role) => {
            return (
              <li key={role.id} onClick={() => this.handleChooseRole(role)}>
                <div>
                  <img alt={`${role.name} path`} src={role.img} />
                  <p className={classNames({selected: current === role.id})}>
                    <strong>{role.position}</strong>
                    {role.title}
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
