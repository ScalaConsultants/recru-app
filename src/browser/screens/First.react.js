import Component from 'react-pure-render/component';
import ChevronIcon from '../components/ChevronIcon.react';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

if (process.env.IS_BROWSER) {
  require('./First.styl');
}

export default class FirstScreen extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  proceed() {
    const name = this.state.name.trim();
    const {actions: {saveName, nextScreen}} = this.props;

    if (name) {
      saveName(name);
    }

    this.blur();
    nextScreen();
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.blur();
      this.proceed();
    }
  }

  blur() {
    ReactDOM.findDOMNode(this.refs.nameInput).blur();
  }

  render() {
    const formControlClassName = classNames('form-control', {
      '-error': !!this.state.error
    });

    const background = {
      backgroundImage: 'url(../../../assets/img/bg.png)'
    };

    return (
      <section className="first-screen screen" style={background}>
        <div className="centering-wrapper">
          <header>
            <h1>Join our team</h1>
            <h2>we are looking for talented passionate people</h2>
            <div className={formControlClassName}>
              <input
                autoComplete="off"
                autoFocus
                onChange={e => this.setState({name: e.target.value})}
                onKeyDown={e => this.handleKeyDown(e)}
                placeholder="how should we call you?"
                ref="nameInput"
                tabIndex="-1"
                type="text"
              />
            </div>
          </header>
        </div>
        <ChevronIcon isAnimated onClick={e => this.proceed(e)}/>
      </section>
    );
  }
}
