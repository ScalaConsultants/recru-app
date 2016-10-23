import Component from 'react-pure-render/component';
import React from 'react';
import boundScroll from '../lib/boundScroll';
import json from '../data/roles.json';

if (process.env.IS_BROWSER) {
  require('./Third.styl');
}

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

    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  handleChooseRole(role) {
    const {actions: {saveRole, nextScreen}} = this.props;
    if (role !== this.state.role) {
      this.setState({role: role}, () => saveRole(this.state.role));
    }
    nextScreen();
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
