import Chevron from '../../components/Chevron.react';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./JoinUsScreen.styl');
}

export default class FirstScreen extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {error: null};
  }

  proceed() {
    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const namePattern = /[\d`~!@#$%^&*()_';,./<>?\\\|\-\+\=\[\]\{\}:"]/;

    if (!name) {
      this.setState({error: 'We really need your name.'});
      return;
    }
    else if (namePattern.test(name)) {
      this.setState({error: 'Only characters are allowed.'});
      return;
    }

    this.setState(this.getDefaultState());

    const {actions: {saveName, nextScreen}} = this.props;
    saveName(name);
    nextScreen();
  }

  handleMoveDownKeys() {
    this.proceed();
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
              <input autoComplete="off"
                     autoFocus
                     placeholder="type your name"
                     ref="nameInput"
                     tabIndex="-1"
                     type="text"/>
              <span>{this.state.error}</span>
            </div>
          </header>
        </div>

        <Chevron isAnimated onClick={e => this.proceed(e)}/>
      </section>
    );
  }
}