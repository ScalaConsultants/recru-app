import Component from '../components/component.react';
import Chevron from '../components/chevron.react';
import React from 'react';
import classNames from 'classnames';
import './first-screen.styl';

export default class FirstScreen extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {error: null};
  }

  proceed() {
    const name = React.findDOMNode(this.refs.nameInput).value.trim();

    if (!name) {
      this.setState({error: 'We really need your name.'});
      return;
    }

    this.setState(this.getDefaultState());

    const {actions: {candidate, screens}} = this.props;
    candidate.saveName(name);
    screens.nextScreen();
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      React.findDOMNode(this.refs.nameInput).blur();
      this.proceed();
    }
  }

  render() {
    const formControlClassName = classNames('form-control', {
      '-error': !!this.state.error
    });

    return (
      <section className="first-screen screen">
        <div className="centering-wrapper">
          <header>
            <h1>Join our team</h1>
            <h2>we are looking for talented passionate people</h2>
            <div className={formControlClassName}>
              <input autoComplete="off" onKeyDown={::this.handleKeyDown} placeholder="type your name" ref="nameInput" tabIndex="-1" type="text"/>
              <span>{this.state.error}</span>
            </div>
          </header>
        </div>

        <Chevron isAnimated={true} onClick={::this.proceed}/>
      </section>
    );
  }
}
